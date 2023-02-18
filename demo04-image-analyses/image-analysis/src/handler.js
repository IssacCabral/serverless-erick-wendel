const { get } = require("axios");

class Handler {
  constructor({ rekoSvc, translatorSvc }) {
    this.rekoSvc = rekoSvc;
    this.translatorSvc = translatorSvc;
  }

  async getImageBuffer(imageUrl) {
    const response = await get(imageUrl, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "base64");
    return buffer;
  }

  async detectImageLabels(buffer) {
    const result = await this.rekoSvc
      .detectLabels({
        Image: {
          Bytes: buffer,
        },
      })
      .promise();
    const workingItems = result.Labels.filter(
      ({ Confidence }) => Confidence > 80
    );

    const names = workingItems.map(({ Name }) => Name);

    return {
      names,
      workingItems,
    };
  }

  async translateText(text) {
    const params = {
      SourceLanguageCode: "en",
      TargetLanguageCode: "pt",
      Text: text.toString(),
    };

    const { TranslatedText } = await this.translatorSvc
      .translateText(params)
      .promise();

    return TranslatedText.split(",");
  }

  async main(event) {
    try {
      const { imageUrl } = event.queryStringParameters;

      if (!imageUrl) {
        return {
          statusCode: 400,
          body: "an IMG URL is required",
        };
      }

      console.log("downloading image...");
      const buffer = await this.getImageBuffer(imageUrl);

      console.log("detecting labels...");
      const { names, workingItems } = await this.detectImageLabels(buffer);

      console.log("translating to portuguese...");
      const texts = await this.translateText(names);
      console.log(texts);
      return {
        statusCode: 200,
        body: "Hello",
      };
    } catch (err) {
      console.error(err.stack);
      return {
        statusCode: 500,
        body: "Internal Server Error",
      };
    }
  }
}

module.exports = Handler;
