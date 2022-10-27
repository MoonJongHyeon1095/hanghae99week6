const { Meetings, Likes, Participates, Users, Images } = require("../models");

class MeetingsRepository {
  findById = async (userId) => {
    const findByIdData = await Users.findByPk(userId);
    return findByIdData
  };

  /**게시글 전체조회 */
  findAllMeeting = async () => {
    const findAllMeetings = await Meetings.findAll({
      include: [ { model: Images, as: 'Images', attributes: ['imageUrl']}]
    });
    return findAllMeetings
  };

  /**게시글 단일조회
   * @param {Number} meetingId 조회할 게시글ID
   * @returns 조회한 게시글
   */
  findOneMeeting = async (meetingId) => {
    const findOneMeetingData = await Meetings.findOne({
      where: { meetingId: meetingId },
      include: [
        { model: Participates, as: 'Participates'},
        { model: Images, as: 'Images', attributes: ['imageUrl']},
      ],
    });
    return findOneMeetingData;
  };

  /**유저가 좋아요 눌렀는지 조회 */
  findOneLike = async (userId, meetingId) => {
    const findOneLike = await Likes.findOne({ where: { userId:userId, meetingId:meetingId } });
    return findOneLike;
  };

  /**게시글 생성
   * @param {Number} userId 작성자ID
   * @param {String} nickname 작성자nickname
   * @param {String} title 게시글 제목
   * @param {String} content 게시글 내용
   */
  createMeeting = async (userId, nickname, title, content) => {
    const createMeetingData = await Meetings.create({ userId, nickname, title, content });
    return createMeetingData
  };

  /**게시글 수정
   * @param {Number} meetingId 수정할 게시글ID
   * @param {Number} userId 수정요청한 유저iD
   * @param {String} title 수정할 제목
   * @param {String} content 수정할 내용
   */
  updateMeeting = async (meetingId, userId, title, content) => {
    await Meetings.update({ title, content }, { where: { meetingId, userId } });
  };

  /**게시글 삭제
   * @param {Number} meetingId 삭제할 게시글ID
   * @param {Number} userId 삭제요청한 유저ID
   */
  deleteMeeting = async (meetingId, userId) => {
    await Meetings.destroy({ where: { meetingId:meetingId, userId:userId } });
  };
}

module.exports = MeetingsRepository;
