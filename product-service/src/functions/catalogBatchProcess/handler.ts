import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const catalogBatchProcess = async (event) => {
  console.log('Incoming event into catalogBatchProcess is:   ', event);
  event.Records.map(data => console.log('Incoming message is   ', data.body));
  return formatJSONResponse({message: 'Soon'});
}

export const main = middyfy(catalogBatchProcess);
