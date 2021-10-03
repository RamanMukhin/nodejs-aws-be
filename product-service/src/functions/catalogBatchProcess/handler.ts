import 'source-map-support/register';

import { middyfy } from '@libs/lambda';

import { Client } from 'pg';
import { dbOptions } from '../../common/dbOptions';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const { REGION, SNS_ARN } = process.env;

const catalogBatchProcess = async (event) => {
  console.log('Incoming event into catalogBatchProcess is:   ', event);

  const flowersForCreate = event.Records.map(record => JSON.parse(record.body));
  console.log('Recived flowers for create is:    ', flowersForCreate);

  flowersForCreate.map(async (flower) => {
    const client = new Client(dbOptions);

    try {
      const { description, title, sort, height, price, count } = flower;

      await client.connect();

      await client.query('BEGIN');
      const ifExists = await client.query(`select * from flowers where title = '${title}' and sort = '${sort}' and height = ${height} `);
      const existsProduct = ifExists.rows[0];
      if (existsProduct) {
        console.log('This product already exists:   ', existsProduct);

        const snsClient = new SNSClient({ region: REGION });

        const publishParams = {
          TopicArn: SNS_ARN,
          Subject: 'NOT created products on product-service at AWS',
          Message: 'The following product is already exists: \n' + JSON.stringify(existsProduct),
          MessageAttributes: {
            alreadyExists: {
              DataType: 'String',
              StringValue: 'true',
            },
            price: {
              DataType: 'Number',
              StringValue: String(existsProduct.price),
            },
          },
        };

        const publishCommand = new PublishCommand(publishParams);

        try {
          await snsClient.send(publishCommand);
        } catch (error) {
          console.log('Sending in SNS ERROR IS:   ', error);
        }

        return;
      };

      await client.query(`insert into flowers values (default, '${description}', '${title}', '${sort}', ${height}, ${price})`);
      const { rows } = await client.query(`select id from flowers where title = '${title}' and sort='${sort}' and height=${height}`);
      const { id } = rows[0];
      await client.query(`insert into stock values ('${id}', ${count})`);

      const ifCreated = await client.query('select f.id, description, title, sort, height, price, count from flowers f join stock s on f.id = s.id where f.id = $1', [id]);
      await client.query('COMMIT');

      const newFlower = ifCreated.rows[0];
      console.log('New created flower is   :', newFlower);


      const snsClient = new SNSClient({ region: REGION });

      const publishParams = {
        TopicArn: SNS_ARN,
        Subject: 'Created products on product-service at AWS',
        Message: 'The following product was created and saved to the database: \n' + JSON.stringify(newFlower),
        MessageAttributes: {
          price: {
            DataType: 'Number',
            StringValue: String(newFlower.price),
          },
        },
      };

      const publishCommand = new PublishCommand(publishParams);

      try {
        await snsClient.send(publishCommand);
      } catch (error) {
        console.log('Sending in SNS ERROR IS:   ', error);
      }

    } catch (err) {
      await client.query('ROLLBACK');
      console.log('The following error occurred while creating the flower:   ', err);
    } finally {
      await client.end();
    }

  });
}

export const main = middyfy(catalogBatchProcess);
