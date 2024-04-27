
// 路径参数


const validator = require('validator');

function pathParams(req, res, next) {

  //console.log(req)
  toLog("url:", req.url)
  let url = req.url
  let find_txt = "/1.webp"
  let index = url.indexOf(find_txt)
  if (index < 0) {
    return res.status(400).send('Invalid URL');
  }
  let start_index = 0
  if (url.indexOf("/") == 0) start_index = 1
  let part_txt = url.substring(start_index, index)
  let splits = part_txt.split("/")
  toLog("splits:", splits)
  toLog("query:", req.query)
  toLog("params:", req.params)
  let size = splits.length;
  if (size % 2 != 0) {
    return res.status(400).send("params size error! params size:" + size);
  }
  for (let index = 0; index < splits.length;) {
    const key = splits[index];
    const value = splits[index + 1];
    index += 2
    if (key == "url") {
      const newValue = decodeURIComponent(value)
      req.query[key] = newValue
      continue
    }
    req.query[key] = value
  }

  toLog("query:", req.query)
  toLog("params:", req.params)

  next();
}

function toLog(tag, obj) {
  //console.log(tag + JSON.stringify(obj))
}

module.exports = pathParams;
