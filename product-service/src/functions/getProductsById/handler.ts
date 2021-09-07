import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { AppError } from '@libs/appError';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { validate as isUuid } from 'uuid';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Client } from 'pg';
import { dbOptions } from '../../common/dbOptions';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('Incoming event into getProductsById is:   ', event);
  const client = new Client(dbOptions);
  const { productId } = event.pathParameters;
  
  if (!isUuid(productId)) {
    throw new AppError(getReasonPhrase(StatusCodes.BAD_REQUEST), StatusCodes.BAD_REQUEST);
  }

  try {
    await client.connect();
    const { rows } = await client.query('SELECT f.id, description, title, sort, height, price, count FROM flowers f join stock s on f.id = s.id WHERE f.id = $1', [productId]);
    const product = rows[0];
    if (!product) {
      throw new AppError(getReasonPhrase(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND);
    }
    return product;
  } finally {
    await client.end();
  }
}

export const main = middyfy(getProductsById);
