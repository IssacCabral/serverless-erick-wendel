module.exports.hello = async (event) => {
  console.log("Periquitos voantes");
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Minha mensagem",
      },
      null,
      2
    ),
  };
};
