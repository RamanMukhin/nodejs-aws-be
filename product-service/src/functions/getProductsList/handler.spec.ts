import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';

import { middyfy } from '@libs/lambda';
import { Client } from 'pg';

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

jest.mock('@libs/lambda');

const flowerInDb = {
  id: "8e9ad1cb-9f93-46d5-beba-c2c930786f5f",
  description: "Short Product Description1",
  title: "Rose",
  sort: "avalansh",
  height: 30,
  price: 1.1,
  count: 300
};

describe('getProductList', () => {
  let client;
  let main;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    client = new Client();
    mockedMiddyfy = mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });

    main = (await import('./handler')).main;
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should return list of products', async () => {
    client.connect.mockResolvedValueOnce(1);
    client.query.mockResolvedValueOnce({ rows: [flowerInDb], rowCount: 1 });
    client.end.mockResolvedValueOnce(1);
    const equalValue = [flowerInDb];

    const event = {
      body: {}
    };

    const actual = await main(event);

    expect(actual).toEqual(equalValue);
    expect(Array.isArray(actual)).toBe(true);
    expect(client.connect).toHaveBeenCalledTimes(1);
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.end).toHaveBeenCalledTimes(1);
  });

});
