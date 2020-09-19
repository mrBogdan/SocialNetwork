"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
relationSchema.post('save', async (doc) => {
    await doc.populate(userPopulateField).execPopulate();
});
function populateFields() {
    this.populate(userPopulateField);
}
relationSchema.pre('find', populateFields);
relationSchema.pre('findOne', populateFields);
relationSchema.pre('findOneAndUpdate', populateFields);
relationSchema.pre('deleteOne', populateFields);
exports.default = mongoose.model('relations', relationSchema);
