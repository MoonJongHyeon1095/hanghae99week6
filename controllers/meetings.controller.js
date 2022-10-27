const MeetingsService = require("../services/meetings.service");
const ImagesService = require("../services/images.service");
const aws = require("aws-sdk");
require("dotenv").config();


class MeetingsController {
  meetingsService = new MeetingsService();
  imagesService = new ImagesService();

  /**미팅게시글 전체 불러오기 컨트롤러*/
  findAllMeeting = async (req, res, next) => {
    try {
      /** 게시글 전체 불러오기 서비스 호출*/
      /**정상적으로 불러오면 데이터 넘겨주기 */
      const { userId } = res.locals.user;
      const findallmeeting = await this.meetingsService.findAllMeeting(userId);
      res.status(200).json({ data: findallmeeting });
    } catch (err) {
      next(err);
    }
  };

  /**미팅게시글 상세조회 컨트롤러*/
  findOneMeeting = async (req, res, next) => {
    try {
      /**조회할 게시글ID*/
      /**조회할 게시글 불러오기 서비스 호출*/
      /**정상적으로 불러오면 데이터 넘겨주기 */
      const { userId } = res.locals.user;
      const { meetingId } = req.params;
      const findonemeeting = await this.meetingsService.findOneMeeting(
        userId,
        meetingId
      );
      res.status(200).json({ data: findonemeeting });
    } catch (err) {
      next(err);
    }
  };

  /**게시글 생성 컨트롤러*/
  createMeeting = async (req, res, next) => {
    try {
      /**
       * @const userId 게시글 생성할 유저ID
       * @const nickname 게시글 생성할 유저 닉네임
       * @const title 게시글 제목
       * @const content 게시글 내용
       */
      const { userId, nickname } = res.locals.user;
      const { title, content } = req.body;

      /** 게시글 생성서비스 호출 */
      const createmeeting = await this.meetingsService.createMeeting(
        userId,
        nickname,
        title,
        content
      );

      /**정상적으로 생성되면 완료 메세지 넘겨주기*/
      res.status(200).json({ createmeeting });
    } catch (err) {
      next(err);
    }
  };

  /**게시글 수정 컨트롤러*/
  updateMeeting = async (req, res, next) => {
    try {
      /**게시글 수정 요청한 유저ID*/
      const userId = res.locals.user.userId;

      /**수정할 게시글ID */
      const meetingId = req.params.meetingId;

      /**
       * @const title 수정할 제목
       * @const content 수정할 내용
       */
      const { title, content } = req.body;

      /** 게시글 수정 서비스 호출 */
      const updatemeeting = await this.meetingsService.updateMeeting(
        meetingId,
        userId,
        title,
        content
      );

      /**정상적으로 수정되면 완료메세지 넘겨주기 */
      res.status(200).json({ updatemeeting });
    } catch (err) {
      next(err);
    }
  };

  /**게시글 삭제 컨트롤러*/
  deleteMeeting = async (req, res, next) => {
    try {
      /**게시글 삭제 요청한 유저ID */
      const {userId} = res.locals.user;

      /**삭제할 게시글ID */
      const {meetingId} = req.params;

      /**게시글이 삭제되면서 S3 이미지도 함께 삭제 */
      //이미지 찾기 및 가공
      const foundAllImages = await this.imagesService.findAllImages(meetingId);
      console.log('foundAllImages:',foundAllImages)
      console.log(foundAllImages[0].imageUrl)

      for (let i = 0; i < foundAllImages.length; i++) {
        let name = foundAllImages[i].imageUrl.split("com/")[1];
        console.log("이미지이름:", name);

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
            next(err)
          }
        });
     }

      /**게시글 삭제 서비스 호출 */
      const deletemeeting = await this.meetingsService.deleteMeeting(
        meetingId,
        userId
      );

      /**정상적으로 삭제되면 완료메세지 넘겨주기 */
      res.status(200).json({ deletemeeting });
    } catch (err) {
      next(err);
    }
  };
}
module.exports = MeetingsController;
