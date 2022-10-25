const { Likes, Meetings } = require("../models");

class LikeRepository {
  /**좋아요 요청한 게시글 찾아오기
   * @param userId 좋아요한거 찾아올 유저ID
   * @param meetingId 좋아요 요청한 게시글ID
   */

  findOneLike = async ({ userId, meetingId }) => {
    const findOneLike = await Likes.findOne({ where: { userId, meetingId } });
    return findOneLike;
  };

  /**해당 게시글 좋아요 카운트 +1
   * @param {*} meetingId 카운트해줄 게시글 ID
   */
  upLikeCount = async ({ meetingId }) => {
    await Meetings.increment({ LikeCount: 1 }, { where: { meetingId } });
  };

  /**해당 게시글 좋아요 카운트 -1
   * @param {*} meetingId 키운트빼줄 게시글 ID
   */
  downLikeCount = async ({ meetingId }) => {
    await Meetings.increment({ LikeCount: -1 }, { where: { meetingId } });
  };

  /**좋아요 등록
   * @param {*} userId 좋아요 등록할 유저ID
   * @param meetingId 좋아요 등록할 게시글ID
   */
  createLike = async ({ userId, meetingId }) => {
    const createLike = await Likes.create({ userId, meetingId });
    return createLike;
  };

  /**좋아요 취소 userId:취소요청유저, meetingId:취소할 게시글*/
  cancelLike = async ({ userId, meetingId }) => {
    const cancelLike = await Likes.destroy({ where: { userId, meetingId } });
    return cancelLike;
  };

  /**유저가 좋아한 정보 가져오기*/
  findAllLike = async ({ userId }) => {
    const findAllLike = await Likes.findAll({ where: { userId } });
    return findAllLike;
  };

  /**좋아요 누른 게시글 모두 가져오기
   * @param {Array} findMeetingId 좋아요한 게시글 ID ( Type: array )
   */
  findAllMeeting = async ({ findMeetingId }) => {
    const findOneMeeting = await Meetings.findAll({
      where: { meetingId: findMeetingId },
      include: { model: Likes, as: "Likes" },
    });
    return findOneMeeting;
  };
}

module.exports = LikeRepository;
