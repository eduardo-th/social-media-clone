const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { postValidSchema } = require('./validationschemas');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const multerStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) =>{
      if (req.originalUrl.includes('posts')){
        return 'social-media/posts'
      }
      return 'social-media/avatars'
    },
    allowed_formats: ['jpg', 'png', 'jpeg'],
    eager: (req, file) => {
      if (req.originalUrl.includes('posts')){
        return { gravity: 'center', height: 250, width: 250, crop: 'thumb' };
      }
      return {gravity: "center", height: 250, radius: "max", width: 250, crop: "crop"}     
    },
  },
  //avatar  {gravity: "center", height: 250, radius: "max", width: 250, crop: "crop"}
  //thum    {gravity: "center", height: 250, width: 250, crop: "thumb"}
});
const fileFilter = (req, file, cb) => {
  const { title, body } = req.body;

  const validation = postValidSchema.validate({ title, body });

  if (!validation.error) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter });

module.exports = upload;
