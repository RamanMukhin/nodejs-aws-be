import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayAuthorizerEvent, PolicyDocument } from 'aws-lambda';

import { getReasonPhrase, StatusCodes } from 'http-status-codes';

const basicAuthorizer = async (event: APIGatewayAuthorizerEvent) => {
  console.log('Incoming event into basicAuthorizer is:   ', JSON.stringify(event));

  const { type } = event;
  if (type !== 'TOKEN') {
    return formatJSONResponse({
      message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
    }, StatusCodes.UNAUTHORIZED);
  };

  try {
    const { authorizationToken, methodArn } = event;
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const username = plainCreds[0];
    const password = plainCreds[1];

    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

    const policy = generatePolicy(effect, methodArn);

    console.log('Policy is:   ', JSON.stringify(policy));

    return formatJSONResponse({
      principalId: encodedCreds,
      policyDocument: policy
    });
  } catch (err) {
    console.log('Error is:   ', JSON.stringify(err));
    return formatJSONResponse({
      message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
    }, StatusCodes.UNAUTHORIZED);
  }
}

const generatePolicy = (effect: string, resource: string): PolicyDocument => {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      }
    ]

  }
}

export const main = middyfy(basicAuthorizer);
