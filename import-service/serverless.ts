import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  resources: {
    Resources: {
      SQSSimpleQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue',
          ReceiveMessageWaitTimeSeconds: 20,
          DelaySeconds: 1,
        },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic',
        },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'kextcf2018@tut.by',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            price: [{ 'numeric': ["<=", 1000] }],
          },
        },
      },
      SNSSubscriptionFailed: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'bolzan.valeria@yandex.ru',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            alreadyExists: [{ 'exists': true }],
          },
        },
      },
    },
    Outputs: {
      SQSSimpleQueueArn: {
        Description: 'import-service queue',
        Value: {
          'Fn::GetAtt': [
            'SQSSimpleQueue',
            'Arn',
          ]
        },
        Export: {
          Name: 'SQSArn'
        }
      },
      SNSTopicArn: {
        Description: 'import-service topic',
        Value: {
          Ref: 'SNSTopic'
        },
        Export: {
          Name: 'SNSArn'
        }
      },
    }
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:GetObject',
        Resource: ['arn:aws:s3:::${env:BUCKET}'],
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: ['arn:aws:s3:::${env:BUCKET}/*'],
      },
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: [{
          'Fn::GetAtt': [
            'SQSSimpleQueue',
            'Arn',
          ]
        }],
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      BUCKET: '${env:BUCKET}',
      REGION: '${env:REGION}',
      EXPIRESIN: '${env:EXPIRESIN}',
      FOLDER: '${env:FOLDER}',
      FOLDER_TO: '${env:FOLDER_TO}',
      SQS_URL: {
        Ref: 'SQSSimpleQueue',
      },
    },
    lambdaHashingVersion: '20201221',
  },

  // import the function via paths
  functions: { importProductsFile, importFileParser },
  useDotenv: true,
};

module.exports = serverlessConfiguration;
