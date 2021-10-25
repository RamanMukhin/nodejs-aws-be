import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { APIGatewayAuthorizerEvent, Context, Callback, PolicyDocument } from 'aws-lambda';

const basicAuthorizer = async (event: APIGatewayAuthorizerEvent, _context: Context, callback: Callback) => {
  console.log('Incoming event into basicAuthorizer is:   ', JSON.stringify(event));

  const { type } = event;
  if (type !== 'TOKEN') {
    return callback('Unauthorized');
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

    return callback(null, {
      principalId: encodedCreds,
      policyDocument: policy
    });
  } catch (err) {
    console.log('Error is:   ', JSON.stringify(err));
    return callback('Unauthorized');
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
