import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';

import { middyfy } from '@libs/lambda';
import { products } from '../../productsRange/products';

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
    const event = {
      body: {}
    };
    const actual = await main(event);
    expect(JSON.parse(actual.body)).toEqual(products);
  });
});
