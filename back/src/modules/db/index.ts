import * as mongoose from 'mongoose';

const config = require('../../../config/app');

export function connect() {
  mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Connected to mongo'))
    .catch((e) => console.error(e));
}
