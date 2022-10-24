const multer = require("multer");
const multerS3 = require("multer-s3");
//const multerS3 = require('multer-s3-transform');
const aws = require("aws-sdk");
const sharp = require("sharp");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEYID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  region: process.env.AWS_KEY_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: true,
    acl: "public-read",
    key: function (req, file, cb) {
      //let extension = path.extname(file.originalname);
      //cb(null, Date.now().toString() + extension);
      cb(null, `${Date.now()}_${file.originalname}`);
    },
    /**

         *이미지 리사이징 추가 공부요망
         *     
        transforms: [
            {
              id: "resized",
              key: function (req, file, cb) {
                //let extension = path.extname(file.originalname);
                //cb(null, Date.now().toString() + extension);
                cb(null, `${Date.now()}_${file.originalname}`);
              },
              transform: function (req, file, cb) {
                cb(null, sharp().resize(100, 100)); // 이미지를 100x100 으로 리사이징
              },
            },
          ], 
          */

  }),
})

module.exports = upload;
