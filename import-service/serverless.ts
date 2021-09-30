import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';
import catalogBatchProcess from '@functions/catalogBatchProcess';

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
        },
      },
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: ['arn:aws:s3:::${env:BUCKET}'],
      },
      {
        Effect: "Allow",
        Action: "s3:*",
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
      PG_HOST: '${env:PG_HOST}',
      PG_PORT: '${env:PG_PORT}',
      PG_DB: '${env:PG_DB}',
      PG_USER: '${env:PG_USER}',
      PG_PASSWORD: '${env:PG_PASSWORD}',
      BUCKET: '${env:BUCKET}',
      REGION: '${env:REGION}',
      EXPIRESIN: '${env:EXPIRESIN}',
      FOLDER: '${env:FOLDER}',
      SQS_URL: {
        Ref: 'SQSSimpleQueue',
      },
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser, catalogBatchProcess },
  useDotenv: true,
};

module.exports = serverlessConfiguration;
