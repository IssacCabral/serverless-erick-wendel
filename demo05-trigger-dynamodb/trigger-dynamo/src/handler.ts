class Handler {
  async main() {
    try {
      return {
        statusCode: 200,
        body: "",
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
