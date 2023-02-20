const decoratorValidator = function (fn, schema, argsType) {
  return async function (event) {
    const data = JSON.parse(event[argsType]);
    const { error, value } = await schema.validate(data, { abortEarly: true });

    event[argsType] = value;

    if (!error) return fn(event);

    return {
      statusCode: 422,
      body: error.message,
    };
  };
};

export default decoratorValidator;
