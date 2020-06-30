import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categories = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('categories', categories);
