import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';

import { middyfy } from '@libs/lambda';
import { mockClient } from "aws-sdk-client-mock";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
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

const SNSClientMock = mockClient(SNSClient);

const flowerInDb = {
  id: "8e9ad1cb-9f93-46d5-beba-c2c930786f5f",
  description: "Short Product Description1",
  title: "Rose",
  sort: "avalansh",
  height: 30,
  price: 1.1,
  count: 300
};

describe('catalogBatchProcess', () => {
  let client;
  let main;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    client = new Client();
    SNSClientMock.reset();
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

  it('should saved in db recived flowers', async () => {
    client.connect.mockResolvedValueOnce(1);
    client.query.mockResolvedValueOnce(1).mockResolvedValueOnce({ rows: [flowerInDb], rowCount: 1 });
    client.end.mockResolvedValueOnce(1);

    const event = {
      Records: [
        {
          body: '{"id":"5555ec4b-b10c-48c5-9345-fc73c48a80a2","description":"Short Product Description5","title":"Rose","sort":"missPiggi","height":"70","count":"5","price":"5.5"}',
        },
        {
          body: '{"id":"7777ec4b-b10c-48c5-9345-fc73c48a80a2","description":"Short Product Description7","title":"Rose","sort":"vau","height":"70","count":"7","price":"7.7"}',
        }
      ]
    };

    SNSClientMock
      .on(PublishCommand)
      .resolves({
        MessageId: 'MessageId',
        SequenceNumber: 'SequenceNumber',
      })

    const actual = await main(event);

    expect(client.connect).toHaveBeenCalledTimes(2);
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.end).toHaveBeenCalledTimes(0);
    expect(actual).toBeUndefined;

  });

});
