#!/usr/bin/env node
'use strict';

var Grasper = require('..');
var Tentacles = require('tentacles');
var tentacles = new Tentacles({ accessToken: process.env.GITHUB_ACCESS_TOKEN });

var lastId = (process.argv.length == 3) ? process.argv[2]: undefined;

var stream = getStream(function(since) {
  var opts = { query: { since: since || lastId, per_page: 100 } };
  return tentacles.user.listAll(opts);
});

stream.on('data', function(user) {
  console.log(user.login+','+user.id);
});

stream.on('end', function() {
  process.exit(0);
});

stream.on('error', function(err) {
  console.error(err);
  console.error(err.stack);
  process.exit(1);
});
