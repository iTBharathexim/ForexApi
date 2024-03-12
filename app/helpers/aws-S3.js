 const path = require("path"),
  aws = require("aws-sdk"),
  multer = require("multer"),
  multerS3 = require("multer-s3"),
  s3 = new aws.S3({
    params: { Bucket: 'narendra123' },
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
  });

function checkImageFileType(file, callback) {
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return callback(null, true);
  else callback("Error: Images Only!", null);
}

function checkFileType(file, callback) {
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|txt/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (filetypes) return callback(null, true);
  else callback("Error: Images, Text and PDF Files Only!", null);
}

const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'narendra123',
    key: function(req, file, cb) {
      cb(null, file.originalname);
    },
    acl: "public-read"
  }),
  fileFilter: function(req, file, callback) {
    checkImageFileType(file, callback);
  }
});

const fileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'narendra123/projects/temp',
    key: function(req, file, cb) {
      cb(null, file.originalname);
    },
    acl: "public-read"
  }),
  fileFilter: function(req, file, callback) {
    checkFileType(file, callback);
  }
});

module.exports = { imageUpload, fileUpload };
