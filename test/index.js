'use strict';

var
  df = require('../lib/df');

describe('Unit tests', function () {
  it('should do the job', function (done) {
    var
      config = {
        host: null,
        port: 22,
        username: null,
        password: null
      };

    df(config, function (error, response) {

      if (error) { return done(error); }

      console.log(response);
      done();
    });
  });
});