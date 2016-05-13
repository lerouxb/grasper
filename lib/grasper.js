"use strict";

var debug = require('debug')('grasper');
var es = require('event-stream');


function Grasper(makePromise) {
  var since;
  return es.readable(function(count, callback) {
    debug("polled", count, since);
    var stream = this;

    var promise = makePromise(since);

    promise.then(function(body) {
      body.forEach(function(result) {
        stream.emit('data', result);
      });

      if (body.length) {
        // since will be used next time
        since = body[body.length-1].id;
        debug("last one", since);
      } else {
        // all done!
        stream.emit('end');
      }

      callback();
    })
    .catch(function(err) {
      stream.emit('error', err);
    });
  });
}

module.exports = Grasper;
