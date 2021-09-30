import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        BatchSize: 5,
        arn: {
          'Fn::GetAtt': [
            'SQSSimpleQueue',
            'Arn',
          ]
        }
      }
    }
  ]
}
