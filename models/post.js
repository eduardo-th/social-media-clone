const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Comment = require('./comment');

const options = { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } };

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
postSchema.virtual('image.thumbnail').get(function () {
  if (!this.image.url) {
    return '';
  }
  return this.image.url.replace('/upload', '/upload/c_thumb,g_center,h_250,w_250');
});

const Post = model('Post', postSchema);

module.exports = Post;
