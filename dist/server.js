"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _database = _interopRequireDefault(require("./config/database"));
var _routes = _interopRequireDefault(require("./routes"));
var _Cors = _interopRequireDefault(require("./config/Cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Cấu hình dotenv
_dotenv["default"].config();

// kết nối tới DB của mongo
_database["default"].MongoDB();

// tạo app là đường dẫn gốc trong thư mục
var app = (0, _express["default"])();

// Cấu hình thư mục public cho static
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));

// sử dụng cors để kiểm tra origin
app.use((0, _cors["default"])(_Cors["default"]));

// sử dụng body-parser để parse body
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());

// Cấu hình sử dụng routes để định tuyến các tuyến đường cho app
app.use('/', _routes["default"]);

// middleware bắt lỗi
app.use(function (err, req, res, next) {
  var error = app.get('env') === 'development' ? err : {};
  var status = err.status || 500;
  return res.status(status).json({
    status: false,
    body: null,
    message: error.message
  });
});

// gắn nghe cho app và gán vào server
var server = app.listen(process.env.PORT || 80, function () {
  console.log("Server \u0111ang ch\u1EA1y \u1EDF c\u1ED5ng ".concat(process.env.PORT));
});