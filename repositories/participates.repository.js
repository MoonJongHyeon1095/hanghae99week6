const { Participates, Meetings, Likes } = require("../models");


class ParticipateRepository {

    /**참여정보 찾기 ( userID: 찾을 유저 ), ( meetingId:참여한 게시글 )*/
    findOneParty = async ({userId, meetingId}) =>{
      console.log(userId,meetingId)
        const findOneParty = await Participates.findOne({ where: { userId, meetingId } });

        return findOneParty;
    };

    /**게시글 참여카운트 +1 */
    upPartyCount = async ({ meetingId }) => {
        await Meetings.increment(
          { participateCount: 1 },
          { where: { meetingId } }
        );
      };

      /**게시글 참여 카운트 -1 */
      downPartyCount = async ({ meetingId }) => {
        await Meetings.increment(
          { participateCount: -1 },
          { where: { meetingId } }
        );
      };

      /**참여하기 등록( userId: 참여하는유저 ), ( meetingId: 참여할 게시글 ), ( nickname: 참여하는 유저 닉네임)*/
      joinParty = async ({ userId, meetingId, nickname }) => {
        console.log(nickname)
        const joinParty = await Participates.create({ userId, meetingId, nickname });
        return joinParty;
      };

      /**참여 취소 ( userID: 참여취소할 유저),( meetingID: 참여취소할 게시글 )*/
      cancelParty = async ({ userId, meetingId }) => {
        const cancelParty = await Participates.destroy({ where: { userId, meetingId } });
        return cancelParty;
      };

      /**유저가 참여등록한 모든정보 */
      findAllParty = async ({ userId }) => {
        const findAllParty = await Participates.findAll({ where: { userId } });
        return findAllParty;
      };

      /**유저가 참여한 모든 게시물 가져오기 ( findMeetingID: Type[array] )*/
      findAllMeeting = async ({ findMeetingId }) => {
        const findOneMeeting = await Meetings.findAll({ where: { meetingId: findMeetingId },include:{model: Likes, as: 'Likes'}});
        return findOneMeeting;
      };
}

module.exports = ParticipateRepository