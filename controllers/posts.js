const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const { cloudinary } = require('../multercloudinaryconfig');

module.exports.getIndexPost = async (req, res) => {
  const foundPost = await Post.find().limit(10).sort({ createdAt: -1 });
  res.render('posts/index', { foundPost });
};
module.exports.getFeedPostData = async (req, res) => {  
  let page = 0 || req.query.page;
  const itemsPerPage = 10;
  const foundPost = await Post.find()
    .skip(page * itemsPerPage)
    .limit(itemsPerPage)
    .sort({ createdAt: -1 });
  res.send({ foundPost });
};
module.exports.getNewPost = (req, res) => {
  res.render('posts/new');
};
module.exports.getShowPost = async (req, res) => {
  let userComment = null;
  const { id } = req.params;
  const foundPost = await Post.findById(id)
    .populate('author', 'username')
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'username', ref: 'User' },
    });

  if(!foundPost){
    req.flash('error','post not found')
    return res.redirect('/posts')
  }
  if (req.user) {
    userComment = foundPost.comments.find((elem) => elem.author._id.equals(req.user._id));
  }
  res.render('posts/show', { foundPost, userComment });
};
module.exports.getEditPost = async (req, res) => {
  const { id } = req.params;
  const foundPost = await Post.findById(id);
  res.render('posts/edit', { foundPost });
};
module.exports.createNewPost = async (req, res) => {
  const { title, body, tags } = req.body;
  const image = {
    url: req.file ? req.file.path : '',
    filename: req.file ? req.file.filename : '',
  };
  const postDoc = new Post({
    title,
    body,
    tags: tags.split(','),
    author: req.user._id,
    image,
  });
  await postDoc.save();

  User.findById(req.user.id, (err, foundDoc) => {
    foundDoc.posts.push(postDoc._id);    
    foundDoc.save()
  });
  
  res.redirect(`/posts/${postDoc.id}`);
};
module.exports.editPost = async (req, res) => {
  const { id } = req.params;
  const { title, body, tags } = req.body;
  const editedPost = {
    title,
    body,
    tags: tags.split(','),
  };
  const foundDoc = await Post.findByIdAndUpdate(id, editedPost);
  res.redirect(`/posts/${id}`);
};
module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;

  const foundPost = await Post.findById(id);
  const deletePost = Post.findByIdAndDelete(id);  
  const deleteComments = Comment.deleteMany({ _id: { $in: foundPost.comments } });
  const updateUser = User.findByIdAndUpdate(userId, { $pull: { posts: id } });
  const [foundDoc] = await Promise.all([deletePost, deleteComments, updateUser]);

  if (foundDoc.image.filename) {
    cloudinary.uploader.destroy(foundDoc.image.filename);
  }
  res.redirect('/');
};
