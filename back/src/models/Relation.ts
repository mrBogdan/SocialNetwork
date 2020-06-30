import * as mongoose from 'mongoose';
import { Document } from "mongoose";

const Schema = mongoose.Schema;

const relationSchema = new Schema({
  subscriber: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  source: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  }
});

const userPopulateField = 'source subscriber';

relationSchema.post('save', async (doc: Document) => {
  await doc.populate(userPopulateField).execPopulate();
});

function populateFields(this: Document) {
  this.populate(userPopulateField);
}

relationSchema.pre('find', populateFields);
relationSchema.pre('findOne', populateFields);
relationSchema.pre('findOneAndUpdate', populateFields);
relationSchema.pre('deleteOne', populateFields);

export default mongoose.model('relations', relationSchema);
