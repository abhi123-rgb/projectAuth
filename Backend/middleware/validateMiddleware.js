function validate(schema) {
  return async function (req, res, next) {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (err) {
      if (err) {
        console.log(err.errors[0].message);
        const message = err.errors[0].message;
        res.status(400).json({
          message: message,
        });
      }
    }
  };
}

module.exports = validate;
