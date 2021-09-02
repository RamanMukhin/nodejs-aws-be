import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Product } from '@functions/product';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Client } from 'pg';
import { dbOptions } from '../../common/dbOptions';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.pathParameters;
  const client = new Client(dbOptions);

  try {
    await client.connect();

    const { rows } = await client.query('SELECT f.id, description, title, sort, height, price, count FROM flowers f join stock s on f.id = s.id WHERE f.id = $1', [productId]);
    const product: Product | undefined = rows[0];

    if (!product) {
      return formatJSONResponse({}, StatusCodes.NOT_FOUND, { message: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }

    return formatJSONResponse(product);
  } catch (err) {
    console.log('The error is: ', err);
    return formatJSONResponse({}, StatusCodes.INTERNAL_SERVER_ERROR, { message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  } finally {
    await client.end();
  }
}

export const main = middyfy(getProductsById);
