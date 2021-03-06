import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Client } from 'pg';
import { dbOptions } from '../../common/dbOptions';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('Incoming event into getProductsList is:   ', event);
  const client = new Client(dbOptions);
  try {
    await client.connect();
    const { rows } = await client.query('SELECT f.id, description, title, sort, height, price, count FROM flowers f join stock s on f.id = s.id');
    const products = rows;
    return products;
  } finally {
    await client.end();
  }
};

export const main = middyfy(getProductsList);
