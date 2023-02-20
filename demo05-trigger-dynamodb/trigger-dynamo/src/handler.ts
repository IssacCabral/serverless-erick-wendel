import * as AWS from "aws-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { v1 } from "uuid";
import * as Joi from "@hapi/joi";

class Handler {
  private readonly dynamoDbTable: string;
  constructor(private readonly dynamoDbSvc: AWS.DynamoDB.DocumentClient) {
    this.dynamoDbTable = process.env.DYNAMODB_TABLE ?? "";
  }

  static validator() {
    return Joi.object({
      nome: Joi.string().max(100).min(2).required(),
      poder: Joi.string().max(20).required(),
    });
  }

  private prepareData(data) {
    const params = {
      TableName: this.dynamoDbTable,
      Item: {
        ...data,
        id: v1(),
        createdAt: new Date().toISOString(),
      },
    };
    return params;
  }

  private async insertItem(params) {
    return this.dynamoDbSvc.put(params).promise();
  }

  private handlerSuccess(data) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    return response;
  }

  private handlerError(data) {
    return {
      statusCode: data.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't create item!!",
    };
  }

  async main(event: APIGatewayEvent) {
    try {
      const data = event.body;
      console.log(data);
      return {
        statusCode: 200,
      };
      // const dbParams = this.prepareData(data);
      // await this.insertItem(dbParams);
      // return this.handlerSuccess(dbParams.Item);
    } catch (error) {
      console.error(error.stack);
      return this.handlerError({ statusCode: 500 });
    }
  }
}

export default Handler;
