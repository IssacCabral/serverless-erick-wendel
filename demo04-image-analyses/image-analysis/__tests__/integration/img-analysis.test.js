const { describe, it, expect } = require("@jest/globals");
const requestMock = require("../mocks/request.json");
const { main } = require("../../src");

describe("Image Analyser test suit", () => {
  test("it should analyse successfuly the image returning the results", async () => {
    const expected = {
      statusCode: 200,
      body: "Hello",
    };
    const result = await main(requestMock);
    expect(result).toStrictEqual(expected);
  });

  test("given an empty queryString it should return status code 400", async () => {
    const expected = {
      statusCode: 400,
      body: "an IMG URL is required",
    };
    const result = await main({
      queryStringParameters: {},
    });
    expect(result).toStrictEqual(expected);
  });

  test.todo("given an invalid ImageURL it should return 500");
});
