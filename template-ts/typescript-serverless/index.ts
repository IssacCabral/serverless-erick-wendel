import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Testando o meu Template typescript",
        input: event,
      },
      null,
      2
    ),
  };
};
