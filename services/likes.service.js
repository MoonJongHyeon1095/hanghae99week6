const { ValidationError } = require("../exceptions/index.exception");
const LikeRepository = require("../repositories/likes.repository");

class LikesService {
    constructor() {
        this.likeRepository = new LikeRepository();
      }
      findOneLike = async ({userId, meetingId}) =>{
        console.log("service",userId,meetingId)
        const findOneLike = await this.likeRepository.findOneLike({userId, meetingId})
        return findOneLike
      }

      createLike = async ({ userId, meetingId }) => {
        const Like = await this.likeRepository.findOneLike({ userId, meetingId });
     
        if (!Like) {
          await this.likeRepository.createLike({ userId, meetingId });
          await this.likeRepository.upLikeCount({ meetingId });
        }
      };

      cancelLike = async ({ userId, meetingId }) => {
      
        const Like = await this.likeRepository.findOneLike({ userId, meetingId });
     
        if (Like) {
          await this.likeRepository.cancelLike({ userId, meetingId });
          await this.likeRepository.downLikeCount({ meetingId });
        }
      }

        findAllLike = async ({ userId }) => {
            const findAllLike = await this.likeRepository.findAllLike({ userId }); //로그인된 유저의 모든 좋아요 정보
            const findMeetingId = findAllLike.map((row) => row.meetingId);  //좋아요누른 게시글 ID
            console.log(findMeetingId)
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
                content: meeting.content,
                createdAt: meeting.createdAt,
                updatedAt: meeting.updatedAt,
                participateCount: meeting.participateCount,
                likeCount: meeting.likeCount,
                islike: like
              })
              });
              data.push(result);
            
            return data;
          };

      

}


module.exports = LikesService;