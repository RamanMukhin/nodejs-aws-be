import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';

import { middyfy } from '@libs/lambda';
import { StatusCodes } from 'http-status-codes';

jest.mock('@libs/lambda');

describe('importProductsFile', () => {
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

  it('should return SignedURL', async () => {
    const BUCKET = 'shop-import-service';
    const REGION = 'eu-west-1';
    const FOLDER = 'uploaded';
    const TESTFILE = "test.csv";

    const event = {
      queryStringParameters: {
        name: TESTFILE,
      },
    };

    const actual = await main(event);

    expect(JSON.parse(actual.body).startsWith(`https://${BUCKET}.s3.${REGION}.amazonaws.com/${FOLDER}/${TESTFILE}`)).toEqual(true);
    expect(actual.statusCode).toEqual(StatusCodes.OK);
  });

});
