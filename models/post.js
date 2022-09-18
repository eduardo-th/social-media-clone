const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const options = { timestamps: true };

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{ type: String }],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    image: {
      url: String,
      filename: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  options
);

const Post = model('Post', postSchema);

module.exports = Post;
