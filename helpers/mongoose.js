const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  console.log(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  mongoose
    .connect(
      config.get('mongo.uri'),
      {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err) => {
        if (!err) {
          console.log('mongoDB connected...');
        } else {
          console.log(`MongoDB connection error: ${err}`);
        }
      });

  return mongoose.connection;
};
