const MeetingsService = require("../services/meetings.service");
const ImagesService = require("../services/images.service")
const aws = require("aws-sdk");
const { InvalidParamsError } = require("../exceptions/index.exception");
require("dotenv").config();

class ImagesController {
  meetingsService = new MeetingsService();
  imagesService = new ImagesService();

  //해당 게시글 이미지url 조회
  findAllImages = async ( meetingId ) => {
    if (!meetingId) {
      throw new InvalidParamsError("그런 번호의 게시글이 없습니다.");
    }

    const findAllImage = await this.imagesService.findAllImages(meetingId);
    return findAllImage.imageUrl;
  };

  //게시글 이미지 1개 업로드. 사용하지 않음.
  uploadImage = async (req, res, next) => {
    try {
      console.log(req.file);
      const imageUrl = req.file.location;
      if (!imageUrl) {
        throw new InvalidParamsError("이미지가 req.file.location 안에 없습니다. 멀터가 안넣어준듯?");
      }
      res.status(200).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  };

  //배열로 들어온 다수의 이미지 업로드. 1개여도 이 코드가 호출되도록 함.
  uploadImages = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { meetingId } = req.params;

      const images = req.files;
      const imageUrls = images.map((img) => img.location);
      console.log(imageUrls)

      if (!images) {
        throw new InvalidParamsError("이미지가 req.files 안에 없습니다.");
      }

      await this.imagesService.uploadImages(imageUrls, userId, meetingId);

      res.status(200).send(imageUrls);
    } catch (error) {
      next(error);
    }
  };

  /***
  * 이미지 삭제. 하나씩 삭제 신호를 받는다.
  * DB에서 하나씩 찾아서 지운다.
  * s3에 삭제 신호를 보낸다. 
  */
  deleteImage = async (req, res, next) => {
    try {
      const { name } = req.body;
      console.log(name);

      const imageUrl = name;
      if (!imageUrl) {
        throw new InvalidParamsError('삭제할 이미지를 안알려주셨어요.');
      }  

      const deletedImage = await this.imagesService.deleteImage(imageUrl)

      //s3 버켓 이미지 삭제
      const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEYID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
        region: process.env.AWS_KEY_REGION,
      });

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: name,
      };

      s3.deleteObject(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          res.status(200).json({ data: deletedImage, message: "이미지가 지워졌네요." });
        }
        /*
      data = {
      }
      */
      });

    } catch (error) {
      next(error);
    }
  };
}

module.exports = ImagesController;
