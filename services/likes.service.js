const { ValidationError } = require("../exceptions/index.exception");
const LikeRepository = require("../repositories/likes.repository");

class LikesService {
    constructor() {
        this.likeRepository = new LikeRepository();
      }
      findOneLike = async ({userId, meetingId}) =>{
        await this.likeRepository.findOneLike({userId, meetingId})
      }

      createLike = async ({ userId, meetingId }) => {
        const Like = await this.likeRepository.findOneLike({ userId, meetingId });
     
        if (!Like) {
          await this.likeRepository.createLike({ userId, meetingId });
          await this.likeRepository.upLikeCount({ meetingId });
        }
      };

      cancelLike = async ({ userId, meetingId }) => {
      
        const Party = await this.likeRepository.findOneParty({ userId, meetingId });
     
        if (Party) {
          await this.likeRepository.cancelLike({ userId, meetingId });
          await this.likeRepository.downLikeCount({ meetingId });
        }

        findAllLike = async ({ userId }) => {
            const findAllLike = await this.likeRepository.findAllLike({ userId });
            const findMeetingId = findAllLike.map((row) => row.meetingId);
            let data = [];
            let like;
              const AllMeetings = await this.likeRepository.findAllMeeting({ findMeetingId });

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

}


module.exports = LikesService;