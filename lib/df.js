'use strict';

(function (Connection, DFHelper, _) {

  function df(config, options, callback) {

    if ( ! _.isFunction(callback)) {
      callback = _.isFunction(options) ? options : DFHelper.noop;
    }

    if (_.isFunction(options) || ! _.isObject(options)) {
      options = {};
    }

    var
      baseCmd = 'df -kP',
      cmd = options.file ? baseCmd+' '+options.file : baseCmd;

    var
      ssh = new Connection(),
      end = _.once(function () { ssh.end(); }),

      lastError,
      response,
      ret = _.once(function () { callback(lastError, response); });

    ssh
      .on('ready', function () {
        ssh.exec(cmd, function (error, stream) {
          if (error) {
            lastError = error;
            return;
          }

          stream
            .on('data', function (data) {
              var
                stdout = data.toString();
              
              response = DFHelper.parse(stdout, options);
            })
            .on('exit', function () {
              end();
            })
            .on('end', function () {
              end();
            })
            .on('close', function () {
              end();
            });
        });
      })
      .on('error', function (error) {
        callback(error);
      })
      .on('end', function () {
        ret();
      })
      .on('close', function () {
        ret();
      })
      .connect(config);
  }

  module.exports = df;

}(
  require('ssh2'),
  require('node-df').Helper,
  require('underscore')
  )
);