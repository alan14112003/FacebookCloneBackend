"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateParam = exports.validateBody = void 0;
var validateParam = function validateParam(schema, name) {
  return function (req, res, next) {
    var validatorResult = schema.validate({
      param: req.params[name]
    });
    if (validatorResult.error) {
      return res.status(400).json({
        status: false,
        body: null,
        message: validatorResult.error
      });
    }
    next();
  };
};
exports.validateParam = validateParam;
var validateBody = function validateBody(schema) {
  return function (req, res, next) {
    var validatorResult = schema.validate(req.body);
    if (validatorResult.error) {
      return res.status(400).json({
        status: false,
        body: null,
        message: validatorResult.error
      });
    }
    next();
  };
};
exports.validateBody = validateBody;