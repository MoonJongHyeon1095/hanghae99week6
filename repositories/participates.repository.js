const { Participates, Meetings, Likes } = require("../models");


class ParticipateRepository {
    findOneParty = async ({userId, meetingId}) =>{
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
      joinParty = async ({ userId, meetingId }) => {
        const joinParty = await Participates.create({ userId, meetingId });
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
        const findOneMeeting = await Meetings.findAll({ where: { meetingId: findMeetingId },include:[Likes] });
        return findOneMeeting;
      };
}

module.exports = ParticipateRepository