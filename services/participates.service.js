const { ValidationError } = require("../exceptions/index.exception");
const ParticipateRepository = require("../repositories/participates.repository");



class ParticipatesService {
    constructor() {
        this.participateRepository = new ParticipateRepository();
      }
      findOneParty = async ({userId, meetingId}) =>{
        return await this.participateRepository.findOneParty({userId, meetingId})
      }

      joinParty = async ({ userId, meetingId, nickname }) => {
        console.log(nickname,22222222222222222222222222222222222)
        const Party = await this.participateRepository.findOneParty({ userId, meetingId });
     
        if (!Party) {
          await this.participateRepository.joinParty({ userId, meetingId, nickname });
          await this.participateRepository.upPartyCount({ meetingId });
        }
      };

      cancelParty = async ({ userId, meetingId }) => {
      
        const Party = await this.participateRepository.findOneParty({ userId, meetingId });

        if (Party) {
          await this.participateRepository.cancelParty({ userId, meetingId });
          await this.participateRepository.downPartyCount({ meetingId });
        }
      };

        findAllParty = async ({ userId }) => {
            const findAllParty = await this.participateRepository.findAllParty({ userId });
            const findMeetingId = findAllParty.map((row) => row.meetingId);
            let data = [];
            let like;
              const AllMeetings = await this.participateRepository.findAllMeeting({ findMeetingId });
              console.log(AllMeetings.length)
                //좋아요 정보유무에 따라 islike가 true or false
              const result = AllMeetings.forEach((meeting)=>{ (meeting.Likes)? like = true : like = false
                data.push({
                meetingId: meeting.meetingId,
                userId: meeting.userId,
                nickname: meeting.nickname,
                imageUrl: meeting.imageUrl,
                title: meeting.title,
                likeCount: meeting.likeCount,
                content: meeting.content,
                createdAt: meeting.createdAt,
                updatedAt: meeting.updatedAt,
                participateCount: meeting.participateCount,
                islike: like
              })
              });
              data.push(result);
            
            return data;
          };
     
      };


      



module.exports = ParticipatesService;