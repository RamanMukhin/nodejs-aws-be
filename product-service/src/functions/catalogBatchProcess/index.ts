import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        BatchSize: 5,
        arn: '${cf:import-service-dev.SQSSimpleQueueArn}'
      }
    }
  ]
}
