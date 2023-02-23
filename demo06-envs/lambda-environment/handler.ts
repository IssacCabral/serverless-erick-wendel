import { APIGatewayEvent } from "aws-lambda";
import settings from "./config/settings";
import axios from "axios";
import { load } from "cheerio";
import { DynamoDB } from "aws-sdk";
import { v1 } from "uuid";

const dynamoDB = new DynamoDB.DocumentClient();

class Handler {
  async scheduler(event: APIGatewayEvent) {
    console.log("at", new Date().toISOString(), JSON.stringify(event, null, 2));
    const { data } = await axios.get(settings.commitMessagesUrl);
    const $ = load(data);
    const [commitMessage] = $("#content").text().trim().split("\n");

    const params = {
      TableName: settings.dbTableName,
      Item: {
        commitMessage,
        id: v1(),
        cratedAt: new Date().toISOString(),
      },
    };

    await dynamoDB.put(params).promise();

    return {
      statusCode: 200,
      body: "",
    };
  }
}

// factory
const handler = new Handler();
const scheduler = handler.scheduler.bind(handler);

export { scheduler };
