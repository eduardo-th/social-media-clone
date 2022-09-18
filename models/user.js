const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    url: String,
    filename: String,
  },
  about: { type: String },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  follows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  hash: { type: String },
  salt: { type: String },
});

const User = model('User', userSchema);
module.exports = User;
