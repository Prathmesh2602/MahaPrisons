const sanitizeHtml = require('sanitize-html');

const sanitizePayload = (req, res, next) => {
  if (req.body) {
    const sanitizeObj = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          // Strict sanitization: strip scripts, iframes, object tags. Allow safe rich text formatting.
          obj[key] = sanitizeHtml(obj[key], {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'h1', 'h2', 'h3' ]),
            allowedAttributes: {
              ...sanitizeHtml.defaults.allowedAttributes,
              'img': [ 'src', 'alt', 'width', 'height', 'loading' ],
              'a': [ 'href', 'target', 'rel' ]
            }
          });
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObj(obj[key]);
        }
      }
    };
    
    sanitizeObj(req.body);
  }
  next();
};

module.exports = { sanitizePayload };
