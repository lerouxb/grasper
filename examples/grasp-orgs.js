#!/usr/bin/env node
'use strict';

var Grasper = require('..');
var Tentacles = require('tentacles');
var tentacles = new Tentacles({ accessToken: process.env.GITHUB_ACCESS_TOKEN });

var lastId = (process.argv.length == 3) ? process.argv[2]: undefined;

var stream = new Grasper(function(since) {
  var opts = { query: { since: since || lastId, per_page: 100 } };
  return tentacles.org.listAll(opts);
});

stream.on('data', function(org) {
  console.log(org.login+','+org.id);
});

stream.on('end', function() {
  process.exit(0);
});

stream.on('error', function(err) {
  console.error(err);
  console.error(err.stack);
  process.exit(1);
});
