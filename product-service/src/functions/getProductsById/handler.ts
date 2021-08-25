import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { products } from 'src/productsRange/products';
import { Product } from '@functions/product';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const product: Product | undefined = products.find((product) => product.id === productId);
    if (!product) {
      return formatJSONResponse({}, StatusCodes.NOT_FOUND, { message: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    return formatJSONResponse(product);
  } catch (err) {
    return formatJSONResponse({}, StatusCodes.INTERNAL_SERVER_ERROR, { message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
}

export const main = middyfy(getProductsById);
