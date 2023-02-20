import Handler from "./handler";
import * as AWS from "aws-sdk";
import decoratorValidator from "./util/decoratorValidator";
import { enumParams } from "./util/globalEnum";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const handler = new Handler(dynamoDb);

export const main = decoratorValidator(
  handler.main.bind(handler),
  Handler.validator(),
  enumParams.ARG_TYPE.BODY
);
