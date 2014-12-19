# CSP-headers

Connect middleware that allows you to define a csp policy as a JS object.

tl;dr

    var connect = require('connect'),
        csp = require('csp');
    var app = connect();
    var config = {
        directives: {
            'default-src': 'self'
        }
    };
    
    var port = process.env.port || 3001;
    var policy = createCSP(config);
    var app = connect();
    app.use(policy)
       .listen(port);

Check your headers:

    $ curl -I http://localhost:3001/

    curl -I 127.0.0.1:3001
    HTTP/1.1 200 OK
    Content-Security-Policy: default-src 'self'
    Accept-Ranges: bytes
    Date: Fri, 19 Dec 2014 00:01:33 GMT
    Cache-Control: public, max-age=0
    Last-Modified: Thu, 18 Dec 2014 23:36:49 GMT
    ETag: W/"504-3820769223"
    Content-Type: text/html; charset=UTF-8
    Content-Length: 1284
    Connection: keep-alive

## Debugging with Firefox

Firefox's Web Console includes a category for security messages can be somewhat helpful for debugging your csp policy:

![](http://note.io/1x3GeH3)