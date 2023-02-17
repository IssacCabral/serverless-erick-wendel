class Handler {
  constructor({ rekoSvc, translatorSvc }) {
    this.rekoSvc = rekoSvc;
    this.translatorSvc = translatorSvc;
  }

  async main(event) {
    console.log(event);

    return {
      statusCode: 200,
      body: "Hello",
    };
  }
}

module.exports = Handler;
