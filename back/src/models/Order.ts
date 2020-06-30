import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

const Schema = mongoose.Schema;

const ordersModel = new Schema({
  created_date: {
    type: Date,
    default: Date.now,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  }],
  product_owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  }
});

export default mongoose.model('orders', ordersModel);
