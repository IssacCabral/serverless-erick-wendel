const Handler = require("./handler");
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

const Rekognition = new AWS.Rekognition();
const Translate = new AWS.Translate();

const handler = new Handler({
  rekoSvc: Rekognition,
  translatorSvc: Translate,
});

// o bind serve para assegurar que o contexto this é a instancia de handler
module.exports = handler.main.bind(handler);
