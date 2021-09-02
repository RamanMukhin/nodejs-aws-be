import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Product } from '@functions/product';
import { Client } from 'pg';
import { dbOptions } from '../../common/dbOptions';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';


const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (_event) => {
  const client = new Client(dbOptions);

  try {
    await client.connect();

    const { rows } = await client.query('SELECT f.id, description, title, sort, height, price, count FROM flowers f join stock s on f.id = s.id');
    const products: Product[]  = rows;

    return formatJSONResponse(products);
  } catch (err) {
    console.log('The error is: ', err);
    return formatJSONResponse({}, StatusCodes.INTERNAL_SERVER_ERROR, { message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  } finally {
    await client.end();
  }

};

export const main = middyfy(getProductsList);
