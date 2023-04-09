"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth2"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var _process$env = process.env,
  GOOGLE_CLIENT_ID = _process$env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET = _process$env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_CALLBACK = _process$env.GOOGLE_CLIENT_CALLBACK,
  URL = _process$env.URL;
var GoogleStrategy = _passportGoogleOauth["default"].Strategy;
_passport["default"].use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "".concat(URL).concat(GOOGLE_CLIENT_CALLBACK),
  passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
  return done(null, {
    profile: profile
  });
}));
var _default = _passport["default"];
exports["default"] = _default;