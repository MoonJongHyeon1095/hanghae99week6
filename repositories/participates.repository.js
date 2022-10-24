const { Participates, Meetings, Likes } = require("../models");


class ParticipateRepository {
    findOneParty = async ({userId, meetingId}) =>{
      console.log(userId,meetingId)
        const findOneParty = await Participates.findOne({ where: { userId, meetingId } });

        return findOneParty;
    };
    upPartyCount = async ({ meetingId }) => {
        await Meetings.increment(
          { participateCount: 1 },
          { where: { meetingId } }
        );

      };
      downPartyCount = async ({ meetingId }) => {
        await Meetings.increment(
          { participateCount: -1 },
          { where: { meetingId } }
        );

      };
      joinParty = async ({ userId, meetingId, nickname }) => {
        console.log(nickname)
        const joinParty = await Participates.create({ userId, meetingId, nickname });
        return joinParty;
      };

      cancelParty = async ({ userId, meetingId }) => {
        const cancelParty = await Participates.destroy({ where: { userId, meetingId } });
        return cancelParty;
      };

      findAllParty = async ({ userId }) => {
        const findAllParty = await Participates.findAll({ where: { userId } });
        return findAllParty;
      };

      findAllMeeting = async ({ findMeetingId }) => {
        const findOneMeeting = await Meetings.findAll({ where: { meetingId: findMeetingId },include:{model: Likes, as: 'Likes'}});
        return findOneMeeting;
      };
}

module.exports = ParticipateRepository