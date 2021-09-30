import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { S3Client, GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import csv from 'csv-parser';

const { BUCKET, REGION, FOLDER, FOLDER_TO, SQS_URL } = process.env;

const importFileParser = async (event) => {
  console.log('Incoming event into importFileParser is:   ', event);
  const s3Client = new S3Client({ region: REGION });

  event.Records.forEach(async (element) => {

    const getParams = {
      Bucket: BUCKET,
      Key: element.s3.object.key,
    };

    const getCommand = new GetObjectCommand(getParams);
    const { Body } = await s3Client.send(getCommand);

    const sqsClient = new SQSClient({ region: REGION });


    Body.pipe(csv())
      .on('data', async (chunk) => {
        console.log('Incoming data is:   ', chunk);

        const sendParams = {
          QueueUrl: SQS_URL,
          MessageBody: chunk
        };

        const sendCommand = new SendMessageCommand(sendParams);
        try {
          await sqsClient.send(sendCommand);
        } catch (error) {
          console.log('Sending in SQS ERROR IS:   ', error);
        }

      })
      .on('end', async () => {
        console.log('There will be no more data. Now lets copy.');

        const copyParams = {
          Bucket: BUCKET,
          CopySource: BUCKET + '/' + element.s3.object.key,
          Key: element.s3.object.key.replace(FOLDER, FOLDER_TO),
        };

        const copyCommand = new CopyObjectCommand(copyParams);
        try {
          await s3Client.send(copyCommand);
        } catch (error) {
          console.log('Copying ERROR IS:   ', error);
        }


        const deleteCommand = new DeleteObjectCommand(getParams);
        try {
          await s3Client.send(deleteCommand);
        } catch (error) {
          console.log('Deleting ERROR IS:   ', error);
        }
      });

    formatJSONResponse({ message: 'done' });

  });

}

export const main = middyfy(importFileParser);
