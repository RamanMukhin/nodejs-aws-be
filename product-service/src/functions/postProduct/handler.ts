import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Product } from '@functions/product';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Client } from 'pg';
import { dbOptions } from '../../common/dbOptions';

const postProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const client = new Client(dbOptions);
  const { description, title, sort, height, price, count } = event.body

  try {
    await client.connect();

    await client.query(`insert into flowers values (default, '${description}', '${title}', '${sort}', ${height}, ${price})`);
    const { rows } = await client.query(`select id from flowers where sort='${sort}' and height=${height}`);
    const { id } = rows[0];
    await client.query(`insert into stock values ('${id}', ${count})`);

    const result = await client.query('select f.id, description, title, sort, height, price, count from flowers f join stock s on f.id = s.id where f.id = $1', [id]);
    const newProduct: Product | undefined = result[0];

    return formatJSONResponse(newProduct);
  } catch (err) {
    console.log('The error is: ', err);
    return formatJSONResponse({}, StatusCodes.INTERNAL_SERVER_ERROR, { message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  } finally {
    await client.end();
  }
}

export const main = middyfy(postProduct);
