import middy from "@middy/core";
import { Handler } from "aws-lambda";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { customMiddleware } from "./customMiddleware";


export const middyfy = (handler: Handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(customMiddleware({ enableErrorLogger: process.env.IS_OFFLINE === 'true' }));
}
