const { ValidationError } = require("../exceptions/index.exception");
const LikeRepository = require("../repositories/likes.repository");
const MeetingsRepository = require("../repositories/meetings.repository");

class LikesService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.meetingRepository = new MeetingsRepository();
      }

      /**좋아요 유무 찾기 서비스
       * @param {Number} userId 좋아요 테이블에서 검색할 userId
       * @param {Number} meetingId 좋아요 테이블에서 검색할 게시글ID
       * @returns 좋아요 정보
       */
      findOneLike = async ({userId, meetingId}) =>{
        const findOneLike = await this.likeRepository.findOneLike({userId, meetingId})
        return findOneLike
      }

      /**좋아요 등록 서비스
       * @param {Number} userId 좋아요 등록할 유저ID
       * @param {Number} meetingId 좋아요 등록할 게시글ID
       */
      createLike = async ({ userId, meetingId }) => {
        //게시글이 존재하는지 확인 없을시 에러
        const findMeeting = await this.meetingRepository.findOneMeeting(meetingId);
        if(!findMeeting){
          throw new ValidationError("존재하지 않는 게시글 입니다")
        }

        //좋아요 정보 조회
        const Like = await this.likeRepository.findOneLike({ userId, meetingId });
        
        //찾아온 좋아요 정보가 없으면 좋아요 등록및 해당 게시글 좋아요 카운트+1
        if (!Like) {
          await this.likeRepository.createLike({ userId, meetingId });
          await this.likeRepository.upLikeCount({ meetingId });
        }
      };
      
      /**좋아요 취소 서비스
       * @param {Number} userId 좋아요 취소할 유저ID
       * @param {Number} meetingId 좋아요 취소할 게시글ID
       */
      cancelLike = async ({ userId, meetingId }) => {
        //게시글이 존재하는지 확인 없을시 에러
        const findMeeting = await this.meetingRepository.findOneMeeting(meetingId);
        if(!findMeeting){
          throw new ValidationError("존재하지 않는 게시글 입니다")
        }

        //좋아요 정보 조회
        const Like = await this.likeRepository.findOneLike({ userId, meetingId });
     
        //찾아온 좋아요 정보가 있으면 좋아요 취소및 해당 게시글 좋아요 카운트-1
        if (Like) {
          await this.likeRepository.cancelLike({ userId, meetingId });
          await this.likeRepository.downLikeCount({ meetingId });
        }
      }

      /**로그인된 유저의 좋아요 게시글 전체 불러오기 서비스
       * @param {Number} userId 조회할 유저ID
       */
        findAllLike = async ({ userId }) => {
            const findAllLike = await this.likeRepository.findAllLike({ userId }); //로그인된 유저의 모든 좋아요 정보
            const findMeetingId = findAllLike.map((row) => row.meetingId);  //좋아요누른 게시글 ID

              const AllMeetings = await this.likeRepository.findAllMeeting({ findMeetingId });
            
                //좋아요 정보유무에 따라 islike가 true or false
              const result = AllMeetings.map((meeting)=> { return {
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
                islike: true
                }
              });
            
            
            
            return result;
          };

      

}


module.exports = LikesService;