const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk')
require('dotenv').config();


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
        acl: 'public-read',
        key: function(req, file, cb){
            cb(null, `${Date.now()}_${file.originalname}`); // 이름 설정
        }
    })
});

module.exports = upload