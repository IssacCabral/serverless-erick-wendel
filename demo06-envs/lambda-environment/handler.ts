import { APIGatewayEvent } from "aws-lambda";
import settings from "./config/settings";
import axios from "axios";
import { load } from "cheerio";

class Handler {
  async scheduler(event: APIGatewayEvent) {
    console.log("at", new Date().toISOString(), JSON.stringify(event, null, 2));
    const { data } = await axios.get(settings.commitMessagesUrl);
    const $ = load(data);
    const [commitMessage] = $("#content").text().trim().split("\n");

    console.log(commitMessage);

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
