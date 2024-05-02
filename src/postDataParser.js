
// 路径参数


const validator = require('validator');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var textParser = bodyParser.text({ extended: false })
var jsonParser = bodyParser.json({ extended: false })
var rawParser = bodyParser.raw({ extended: false })

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


function postDataParser(req, res, next) {
  contentType = req.headers['content-type'] || ""
  if (contentType == "") {
    return next();
  } else if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
    return urlencodedParser(req, res, next)
  } else if (contentType.indexOf('application/json') > -1) {
    return jsonParser(req, res, next)
  } else if (contentType.indexOf('text/plain') > -1) {
    return textParser(req, res, next)
  } else if (contentType.indexOf('multipart/form-data') > -1) {
    return multipartMiddleware(req, res, next);
  } else {
    return rawParser(req, res, next)
  }

}

function toLog(tag, obj) {
  // console.log(tag + JSON.stringify(obj))
}

module.exports = postDataParser;
