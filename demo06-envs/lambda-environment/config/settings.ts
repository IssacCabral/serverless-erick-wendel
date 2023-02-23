import * as env from "env-var";

const settings = {
  NODE_ENV: env.get("NODE_ENV").required().asString(),
  commitMessagesUrl: env.get("APICommitMessagesURL").required().asString(),
  dbTableName: env.get("DbTableName").required().asString(),
};

export default settings;
