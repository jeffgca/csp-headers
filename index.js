var _ = require('underscore');

function isKeyWord(name) {
  var keywords = [
    'none',
    'self',
    'unsafe-inline',
    'unsafe-eval'
  ];

  return _.contains(keywords, name);
}

function isValidDirective(directive) {
  var directives = [
    'default-src',
    'script-src',
    'object-src',
    'img-src',
    'media-src',
    'child-src',
    'frame-ancestors',
    'font-src',
    'form-action',
    'connect-src',
    'style-src',
    'report-uri'
  ];

  return _.contains(directives, directive);
}

function quote(s) {
  return "'" + s + "'";
}

function compile(options) {
  if (options.debug) {
    headerName = "Content-Security-Policy-Report-Only";
  }
  else {
    headerName = "Content-Security-Policy";
  }

  var policy = _.map(options.policies, function(v, k) {
    // value can be string or array
    if (_.isArray(v)) {
      v = _.map(v, function(value) {
        if (isKeyWord(value)) {
          value = quote(value);
        }
        return value;
      }).join(' ');
    } 
    else {
      if (isKeyWord(v)) {
        v = quote(v);
      }
    }
    return k + ' ' + v;
  }).join('; ');

  return {
    headerName: headerName, 
    policy: policy
  };
}

function createCSP(options) {
  var policy = compile(options.policies);
  return function(req, res, next) {
    res.setHeader(policy);
  }
}

module.exports = {
  createCSP: createCSP,
  compile: compile
}
