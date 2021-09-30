import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { S3Client, GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import csv from 'csv-parser';

const { BUCKET, REGION, FOLDER, FOLDER_TO } = process.env;

const importFileParser = async (event) => {
  console.log('Incoming event into importFileParser is:   ', event);
  const client = new S3Client({ region: REGION });

  event.Records.forEach(async (element) => {

    const getParams = {
      Bucket: BUCKET,
      Key: element.s3.object.key,
    };

    const getCommand = new GetObjectCommand(getParams);
    const { Body } = await client.send(getCommand);

    Body.pipe(csv())
      .on('data', (chunk) => {
        console.log('Incoming data is:   ', chunk);
      })
      .on('end', async () => {
        console.log('There will be no more data. Now lets copy.');

        const copyParams = {
          Bucket: BUCKET,
          CopySource: BUCKET + '/' + element.s3.object.key,
          Key: element.s3.object.key.replace(FOLDER, FOLDER_TO),
        };

        const copyCommand = new CopyObjectCommand(copyParams);
        await client.send(copyCommand);

        const deleteCommand = new DeleteObjectCommand(getParams);
        await client.send(deleteCommand);
      });

    formatJSONResponse({ message: 'done' });

  });

}

export const main = middyfy(importFileParser);
