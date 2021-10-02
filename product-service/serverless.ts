import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import postProduct from '@functions/postProduct';
import catalogBatchProcess from '@functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "sns:*",
        Resource: '${cf:import-service-dev.SNSTopicArn}',
      },
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
      REGION: '${env:REGION}',
      SNS_ARN: '${cf:import-service-dev.SNSTopicArn}',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, postProduct, catalogBatchProcess },
  useDotenv: true,
};

module.exports = serverlessConfiguration;
