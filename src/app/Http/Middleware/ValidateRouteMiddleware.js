const validateParam = (schema, name) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({ param: req.params[name] })

    if (validatorResult.error) {
      return res.status(400).json({ status: false, body: null, message: validatorResult.error })
    }
    next()
  }
}

const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body)

    if (validatorResult.error) {
      return res.status(400).json({ status: false, body: null, message: validatorResult.error })
    }
    next()
  }
}

export { validateParam, validateBody }
