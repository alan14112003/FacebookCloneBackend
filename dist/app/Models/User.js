"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _SoftDelete = _interopRequireDefault(require("../../config/SoftDelete"));
var _UserGenderEnum = _interopRequireDefault(require("../Enums/Users/UserGenderEnum"));
var _UserRoleEnum = _interopRequireDefault(require("../Enums/Users/UserRoleEnum"));
var _UserStatusEnum = _interopRequireDefault(require("../Enums/Users/UserStatusEnum"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userSchema = new _mongoose["default"].Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  birthdate: Date,
  password: String,
  gender: {
    type: Number,
    "enum": Object.keys(_UserGenderEnum["default"].allName()).map(function (k) {
      return Number(k);
    }),
    "default": _UserGenderEnum["default"].SECRET
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: Number,
    "enum": Object.keys(_UserRoleEnum["default"].allName()).map(function (k) {
      return Number(k);
    }),
    "default": _UserRoleEnum["default"].USER
  },
  hobbies: [{
    type: 'ObjectId',
    ref: 'Hobby'
  }],
  avatar: {
    type: String,
    "default": 'https://ik.imagekit.io/alan/images/facebook_clone/143086968_2856368904622192_1959732218791162458_n.png?updatedAt=1680950589015'
  },
  cover_image: String,
  status: {
    type: Number,
    "enum": Object.keys(_UserStatusEnum["default"].allName()).map(function (k) {
      return Number(k);
    }),
    "default": _UserStatusEnum["default"].UNCONFIRMED
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
userSchema.virtual('full_name').get(function () {
  return "".concat(this.first_name, " ").concat(this.last_name);
});
userSchema.plugin(_SoftDelete["default"], {
  overrideMethods: 'all',
  deleted_by: true,
  deleted_at: true
});
var _default = _mongoose["default"].model('User', userSchema);
exports["default"] = _default;