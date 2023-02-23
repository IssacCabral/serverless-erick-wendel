import { APIGatewayEvent } from "aws-lambda";

const scheduler = async (event: APIGatewayEvent) => {
  console.log(process.env);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Lambda Environment",
        input: event,
      },
      null,
      2
    ),
  };
};

export { scheduler };
