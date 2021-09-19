import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import schema from './schema';

const BUCKET = 'shop-import-service';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const fileName = event.queryStringParameters?.name;
  
  if (!fileName) return formatJSONResponse({
    url: 'No URL',
  });

  const filePath = `uploaded/${fileName}`;

  const client = new S3Client({ region: 'eu-west-1' });

  const params = {
    Bucket: BUCKET,
    Key: filePath,
    Expires: 3600,
    ContentType: 'csv/txt',
  };

  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(client, command);

  return formatJSONResponse({
    url,
  });
}

export const main = middyfy(importProductsFile);
