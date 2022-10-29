const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const options = { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } };
const passportLocalMongoose = require('passport-local-mongoose');
const pluginOptions = { selectFields: ['username', '_id'] };

const userSchema = new Schema(
  {
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
  },
  options
);

userSchema.virtual('avatar.thumbnail').get(function () {
  return this.avatar.url.replace('/upload', '/upload/c_fill,g_faces,h_250,r_max,w_250');
});

userSchema.plugin(passportLocalMongoose, pluginOptions);

const User = model('User', userSchema);
module.exports = User;
