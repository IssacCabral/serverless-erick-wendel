const decoratorValidator = function (fn, schema, argsType) {
  return async function (event) {
    return fn(event);
  };
};

export default decoratorValidator;
