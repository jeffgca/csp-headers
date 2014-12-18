var assert = require('assert');
var csp = require('../index');

it('tests generating a csp', function() {
  // should return: 
  var intended =  {
    headerName: "Content-Security-Policy-Report-Only",
    policy: "img-src 'self' *.cdn-domain.com; default-src 'self' *.mydomain.com"
  }
  var testCsp = {
    policies: {
      'img-src': [ 'self', '*.cdn-domain.com' ],
      'default-src': [ 'self', '*.mydomain.com' ]
    },
    debug: true
  };

  var _csp = csp.compile(testCsp);

  assert.equal(intended.headerName, _csp.headerName);
  assert.equal(intended.policy, _csp.policy);
});

it('tests generating csp policy samples', function() {
  var intended = [
    "default-src 'self'",
    "default-src 'self' *.mydomain.com",
    "default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com",
    "default-src https://onlinebanking.jumbobank.com",
    "default-src 'self' *.mailsite.com; img-src *"
  ];

  assert.equal(csp.compile({policies: {'default-src': 'self'}}).policy, intended[0]);

  assert.equal(csp.compile({
    policies: {'default-src': ['self', '*.mydomain.com']}
  }).policy, intended[1]);

  assert.equal(csp.compile({
    policies: {
      'default-src':  'self',
      'img-src':      '*',
      'media-src':    ['media1.com', 'media2.com'],
      'script-src':   'userscripts.example.com',
    }
  }).policy, intended[2]);

  assert.equal(csp.compile({policies: {'default-src': 'https://onlinebanking.jumbobank.com'}}).policy, intended[3]);

  assert.equal(csp.compile({policies: {
    'default-src': ['self', '*.mailsite.com'],
    'img-src':     '*'
  }}).policy, intended[4]);

});

it('tests debug mode', function() {
  assert.equal(csp.compile({debug: true, policies: {'img-src': '*'}}).headerName, 'Content-Security-Policy-Report-Only');
  assert.equal(csp.compile({debug: false, policies: {'img-src': '*'}}).headerName, 'Content-Security-Policy');
  assert.equal(csp.compile({policies: {'img-src': '*'}}).headerName, 'Content-Security-Policy');
})