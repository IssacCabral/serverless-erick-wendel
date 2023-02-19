import Handler from "./handler";
import * as AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const handler = new Handler(dynamoDb);

export default handler.main.bind(handler);
