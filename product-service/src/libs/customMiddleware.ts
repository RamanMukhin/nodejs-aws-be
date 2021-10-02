import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { formatJSONResponse } from './apiGateway';
import { AppError } from './appError';
import MiddlewareFunction = middy.MiddlewareFunction;

export const customMiddleware = (options: { enableErrorLogger?: boolean } = {}) => {

  const before: MiddlewareFunction<APIGatewayProxyEvent, any> = async (request) => {
    console.log('Incoming request/event to product-servise is:   ', request);

    if (request.event?.httpMethod !== 'post') {
      return;
    }

    const existingKeys = Object.keys(request.event.body);
    const isValide = existingKeys.includes('title')
      && existingKeys.includes('sort')
      && existingKeys.includes('height')
      && existingKeys.includes('count')
      && existingKeys.includes('price');

    if (isValide) {
      return;
    }

    throw new AppError(getReasonPhrase(StatusCodes.BAD_REQUEST), StatusCodes.BAD_REQUEST);
  }

  const onError: MiddlewareFunction<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
    const { error } = request;
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = getReasonPhrase(statusCode);

    if (error instanceof AppError) {
      statusCode = error.statusCode;
      message = error.message;
    }

    if (options.enableErrorLogger) {
      console.error(error);
    }

    request.response = formatJSONResponse({ message }, statusCode);
  }

  const after: MiddlewareFunction<APIGatewayProxyEvent, any> = async (request) => {

    const existingKeys = Object.keys(request.response);
    const isHttpResponse = existingKeys.includes('statusCode')
      && existingKeys.includes('body')
      && existingKeys.includes('headers');

    if (isHttpResponse) {
      return;
    }

    request.response = formatJSONResponse(request.response);
  }

  return {
    before,
    onError,
    after
  };

}
