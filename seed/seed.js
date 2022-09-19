const usernames = require('./usernames');
const avatars = require('./avatars');
const abouts = require('./abouts');
const tagList = require('./tags');
const titles = require('./titles');
const bodys = require('./bodys');
const images = require('./images');
const comments = require('./comments');

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

addUser(10);
addPost(10);
addComment(50).then(() => {
  db.close();
  console.log('DONE');
});

async function addComment(num) {
  await Comment.deleteMany();
  for (let i = 0; i < num; i++) {
    const body = getRandValue(comments);
    const author = mongoose.Types.ObjectId();

    const commentDoc = new Comment({
      body,
      author,
    });
    await commentDoc.save();
  }
}
async function addPost(num) {
  await Post.deleteMany();
  for (let i = 0; i < num; i++) {
    const title = getRandValue(titles);
    const body = getRandValue(bodys);
    const tags = [getRandValue(tagList), getRandValue(tagList), getRandValue(tagList)];
    const image = getRandValue(images);

    const postDoc = new Post({
      title,
      body,
      tags,
      image,
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

    const userDoc = new User({
      username,
      avatar,
      about,
      email,
    });
    await userDoc.save();
  }
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
