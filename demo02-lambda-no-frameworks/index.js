async function handler(event, context) {
  console.log("Context", context);
  console.log("Event", JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({
      hey: "Jude",
    }),
  };
}

module.exports = {
  handler,
};
