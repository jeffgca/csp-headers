# CSP-headers

Connect middleware that allows you to define a csp policy as a JS object.

Start:

    var connect = require('connect'),
        csp = require('csp');
    var app = connect();
    var myCSP = {
        directives: {
            'default-src': 'self'
        },
        debug: true
    };
    var policy = csp.compile(myCSP);
    console.log(myCSP.headerName) // Content-Security-Policy-Report-Only
    console.log(myCSP.policy) // default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com


    // todo: moar examples
