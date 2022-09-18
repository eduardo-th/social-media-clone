const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const options = { timestamps: true };

const commentSchema = new Schema(
  {
    body: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  options
);

const Comment = model('Comment', commentSchema);
module.exports = Comment;
