const LikesService = require("../services/likes.service");

class LikesController {
  likesService = new LikesService();

  /**좋아요수정 컨트롤러 */
  put = async (req, res, next) => {
    try {
      console.log('22222222222222')
      /**종아요 수정요청을 한 유저ID */
      const userId = res.locals.user.userId;

      /**좋아요 수정을 할 게시글 */
      const meetingId = req.params.meetingId;

      console.log(`유저:${userId}`);
      console.log(`게시글:${meetingId}`);

      /**유저정보 또는 미팅정보가 없으면 에러방생 */
      if (!userId || !meetingId) {
        throw new InvalidParamsError();
      }

      /**해당 게시물에 좋아요한 정보 찾아오기*/
      const findOneLike = await this.likesService.findOneLike({
        userId,
        meetingId,
      });
      console.log(`findeOneLike:${findOneLike}`);

      /**좋아요정보 유무에 따라 좋아요상태 변경 */
      if (!findOneLike) {
        await this.likesService.createLike({ userId, meetingId }); //좋아요 되어있지 않을시 좋아요등록
        res.status(201).send({ msg: "좋아요!" });
      } else {
        await this.likesService.cancelLike({ userId, meetingId }); //좋아요 되어 있을시 좋아요취소
        res.status(201).send({ msg: "좋아요 취소" });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = LikesController;
