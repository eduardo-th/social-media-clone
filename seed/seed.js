const usernames = require('./usernames');
const avatars = require('./avatars');
const abouts = require('./abouts');
const tagList = require('./tags');
const titles = require('./titles');
const bodys = require('./bodys');
const images = require('./images');
const comments = require('./comments');

const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const dbUrl = 'mongodb://localhost:27017/socialMedia';
mongoose.connect(dbUrl).catch((err) => console.log(`mongo connection error ${err}`));

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(`mongo error ${err}`);
});
db.once('open', () => {
  console.log('Database Connected');
});

const usersQty = 10;
const postsQty = 10;
const commentsQty = 50;

seed(usersQty, postsQty, commentsQty).then(() => {
  db.close();
  console.log('DONE');
});
async function seed() {
  await addUser(usersQty);
  await addComment(commentsQty);
  await addPost(postsQty);
  await fillUser();
}
async function fillUser() {
  const allUsers = await User.find();
  const allPosts = await Post.find();
  const bulkSave = [];

  for (let user of allUsers) {
    const updateDoc = {
      updateOne: {
        filter: { _id: user._id },
        update: {
          posts: [getRandValue(allPosts), getRandValue(allPosts), getRandValue(allPosts)],
          follows: [getRandValue(allUsers), getRandValue(allUsers), getRandValue(allUsers)],
          followers: [getRandValue(allUsers), getRandValue(allUsers), getRandValue(allUsers)],
        },
      },
    };
    bulkSave.push(updateDoc);
  }
  await User.bulkWrite(bulkSave);
}
async function addPost(num) {
  await Post.deleteMany();
  const allUsers = await User.find();
  const allComments = await Comment.find();
  for (let i = 0; i < num; i++) {
    const title = getRandValue(titles);
    const body = getRandValue(bodys);
    const tags = [getRandValue(tagList), getRandValue(tagList), getRandValue(tagList)];
    const image = getRandValue(images);
    const author = getRandValue(allUsers);
    const comments = [
      getRandValue(allComments),
      getRandValue(allComments),
      getRandValue(allComments),
    ];
    const postDoc = new Post({
      title,
      body,
      tags,
      image,
      author,
      comments,
    });
    await postDoc.save();
  }
}
async function addUser(num) {
  await User.deleteMany();

  for (let i = 0; i < num; i++) {
    const username = getRandValue(usernames);
    const avatar = getRandValue(avatars);
    const about = getRandValue(abouts);
    const email = `${username}@gmail.com`;

    const password = username;
    const salt = getSalt();
    const hash = await getHash(password, salt);

    const userDoc = new User({
      username,
      avatar,
      about,
      email,
      salt,
      hash,
    });
    await userDoc.save();
  }
}
async function addComment(num) {
  await Comment.deleteMany();
  const allUsers = await User.find();
  for (let i = 0; i < num; i++) {
    const body = getRandValue(comments);
    const randUser = getRandValue(allUsers);
    const author = randUser._id;

    const commentDoc = new Comment({
      body,
      author,
    });
    await commentDoc.save();
  }
}
function getHash(password, salt) {
  const encoding = 'hex';
  const iterations = 25000;
  const keylen = 512;
  const algorithm = 'sha256';

  const hash = new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keylen, algorithm, (err, key) => {
      resolve(key.toString(encoding));
    });
  });
  return hash;
}
function getSalt() {
  const saltlen = 32;
  const encoding = 'hex';

  const bufferSalt = crypto.randomBytes(saltlen);
  const salt = bufferSalt.toString(encoding);

  return salt;
}
function getRandIndex(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return index;
}
function getRandValue(arr) {
  const randIndex = getRandIndex(arr);
  const value = arr[randIndex];
  return value;
}
