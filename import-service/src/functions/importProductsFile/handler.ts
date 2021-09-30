import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import schema from './schema';

const { BUCKET, EXPIRESIN, REGION, FOLDER } = process.env;

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('Incoming event into importProductsFile is:   ', event);
  const fileName = event.queryStringParameters?.name;

  if (!fileName) return formatJSONResponse({
    url: 'No URL',
  });

  const filePath = `${FOLDER}/${fileName}`;
  const client = new S3Client({ region: REGION });

  const params = {
    Bucket: BUCKET,
    Key: filePath,
    ContentType: 'csv/txt',
  };

  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(client, command, { expiresIn: +EXPIRESIN });
  return formatJSONResponse(url);
}

export const main = middyfy(importProductsFile);
