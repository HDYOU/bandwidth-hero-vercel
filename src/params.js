const DEFAULT_QUALITY = 40;
const MAX_QUALITY = 100;
const MIN_QUALITY = 10;

// Importing a module for more robust URL validation (consider using a library like 'validator' for comprehensive checks).
const validator = require('validator');

function params(req, res, next) {
  let url = req.query.url;
  
  // If multiple URLs are passed, join them together. This behavior might be revisited based on the expected usage.
  if (Array.isArray(url)) url = url.join('&url=');
  if (!url) return res.end('bandwidth-hero-proxy');
  
  // Corrects some specific URL formatting issues.
  url = url.replace(/http:\/\/1\.1\.\d\.\d\/bmi\/(https?:\/\/)?/i, 'http://');

  // Enhanced URL validation using 'validator'
  // Validate the URL. This helps ensure the proxy is not being misused to request invalid URLs.
  if (!validator.isURL(url, { require_protocol: true })) {
    return res.status(400).send('Invalid URL');
  }

  req.params.url = url;
  
  // Determines the desired output format. Defaults to webp.
  req.params.webp = !req.query.jpeg;
  
  // Checks if the image should be grayscale.
  req.params.grayscale = req.query.bw != 0;

  // Parse and set the compression quality, ensuring it's within acceptable limits.
  let quality = parseInt(req.query.l, 10);
  req.params.quality = Math.min(Math.max(quality || DEFAULT_QUALITY, MIN_QUALITY), MAX_QUALITY);

  // 设置 自定义headers
  let headers = req.query.headers || ""
  if(headers) headers = JSON.parse(atob(headers))
  for (const key in headers) {
    if (Object.hasOwnProperty.call(headers, key)) {
      const element = headers[key];
      // 参数全部转小写
      req.headers[key.toLowerCase()] = element
    }
  }
  // console.log(req.headers)

  next();
}

module.exports = params;
