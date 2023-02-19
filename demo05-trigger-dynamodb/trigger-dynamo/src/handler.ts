import { APIGatewayEvent } from "aws-lambda";

class Handler {
  constructor(private readonly dynamoDbSvc) {}

  async main(event: APIGatewayEvent) {
    try {
      return {
        statusCode: 200,
        body: "hello",
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: "Internal Server Error",
      };
    }
  }
}

export default Handler;
