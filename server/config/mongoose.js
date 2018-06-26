
var mongoose = require('mongoose');
var config = require('./index');
var autoIncrement = require('mongoose-auto-increment');

module.exports.init = function(app) {
 var db;
    var reconnectTimeout = config['mongodb'].dbTimeout;
    var connectWithRetry = function(cb) {
        mongoose.connect(config['mongodb'].uri, function(error) {
            if (error) {
                db.close();
                console.error('Failed to connect to MongoDB on startup', error);
            } else {
                console.info('Connected with MongoDB Server');
            }
        });
        db = mongoose.connection;
        autoIncrement.initialize(db);
        cb && cb();
    };
    connectWithRetry(function() {
        db.on('error', function (error) {
            console.error('Mongoose Error: ', error);
        });
        db.on('connected', function () {
            console.info('Mongoose Connected');
        });
        db.once('open', function () {
            console.info('Mongoose Connection Open');
        });
        db.on('disconnected', function () {
            console.info('Mongoose connection disconnected');
            setTimeout(connectWithRetry, reconnectTimeout);
        });
    });
    connectWithRetry();
  if (app) {
    app.set('mongoose', mongoose);
  }

  return mongoose;
};

module.exports.autoIncrement = autoIncrement;