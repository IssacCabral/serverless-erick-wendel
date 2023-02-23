import { APIGatewayEvent } from "aws-lambda";

async function main(event: APIGatewayEvent) {
  console.log("Event***", JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
  };
}

export { main };
