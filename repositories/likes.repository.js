const { Likes } = require("../models");

class LikeRepository {
    findOneLike = async ({userId, meetingId}) =>{
        const findOneParty = await Likes.findOne({ where: { userId, meetingId } });

        return findOneParty;
    };

    upLikeCount = async ({ meetingId }) => {
        await Meetings.increment(
          { participateCount: 1 },
          { where: { meetingId } }
        );
      };

      downLikeCount = async ({ meetingId }) => {
        await Meetings.increment(
          { participateCount: -1 },
          { where: { meetingId } }
        );

      };

      createLike = async ({ userId, meetingId }) => {
        const createLike = await Likes.create({ userId, meetingId });
        return createLike;
      };

      cancelLike = async ({ userId, meetingId }) => {
        const cancelLike = await Likes.destroy({ where: { userId, meetingId } });
        return cancelLike;
      };

      findAllLike = async ({ userId }) => {
        const findAllLike = await Likes.findAll({ where: { userId } });
        return findAllLike;
      };

      findAllMeeting = async ({ findMeetingId }) => {
        const findOneMeeting = await Meetings.findAll({ where: { meetingId: findMeetingId },include:[Likes] });
        return findOneMeeting;
      };

}

module.exports = LikeRepository;