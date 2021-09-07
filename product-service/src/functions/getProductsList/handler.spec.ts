import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';

import { middyfy } from '@libs/lambda';
import { products } from '../../productsRange/products';
import { StatusCodes } from 'http-status-codes';

jest.mock('@libs/lambda');

describe('getProductList', () => {
  let main;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    mockedMiddyfy = mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });

    main = (await import('./handler')).main;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return list of products', async () => {
    const equalValue = JSON.stringify(products);
    const statusCode = StatusCodes.OK;

    const event = {
      body: {}
    };

    const actual = await main(event);

    expect(actual.body).toEqual(equalValue);
    expect(actual.statusCode).toEqual(statusCode);
  });

});
