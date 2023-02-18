const { describe, expect } = require("@jest/globals");
const requestMock = require("../mocks/request.json");
const { main } = require("../../src");

describe("Image Analyser test suit", () => {
  test("it should analyse successfuly the image returning the results", async () => {
    const expected = {
      statusCode: 200,
      body: "A imagem tem\n99.89% de ser do tipo Pastor alemão\n99.89% de ser do tipo canino\n99.89% de ser do tipo animal de estimação\n99.89% de ser do tipo cão\n99.89% de ser do tipo animal\n99.89% de ser do tipo mamífero",
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

  test("given an invalid ImageURL it should return 500", async () => {
    const expected = {
      statusCode: 500,
      body: "Internal Server Error",
    };
    const result = await main({
      queryStringParameters: {
        imageUrl: "invalidUrl",
      },
    });
    expect(result).toStrictEqual(expected);
  });
});
