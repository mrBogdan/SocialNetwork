import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productsModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  photo: {
    type: String,
    default: '/uploads/no-image.jpg'
  },
  price: {
    type: Number,
    default: 0,
  },
  product_owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'categories',
  },
  created_date: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('products', productsModel);
