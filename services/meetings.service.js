const { InvalidParamsError, ValidationError } = require('../exceptions/index.exception');
const MeetingsRepository = require('../repositories/meetings.repository');

class MeetingsService {
    meetingRepository = new MeetingsRepository();

    /**게시글 전체 조회 서비스 */
    findAllMeeting = async ()=>{
        const findallmeeting = await this.meetingRepository.findAllMeeting();
        findallmeeting.sort((a,b)=>{
                return b.createdAt - a.createdAt;
            });
            console.log(findallmeeting);
                return findallmeeting
                
        }

        /**게시글 상세조회 서비스
         * @param {Number} meetingId 조회할 게시글 ID
         */
    findOneMeeting = async(meetingId)=>{
        const findonemeeting = await this.meetingRepository.findOneMeeting(meetingId)
            return {
                meetingId: findonemeeting.meetingId,
                userId : findonemeeting.userId,
                nickname : findonemeeting.nickname,
                title : findonemeeting.title,
                content : findonemeeting.content,
                createdAt: findonemeeting.createdAt,
                updatedAt: findonemeeting.updatedAt,
                likeCount : findonemeeting.likeCount,
                participateCount :findonemeeting.participateCount
            }  
        }

        /**게시글 생성 서비스
         * @param {Number} userId 게시글 생성 하는 유저ID
         * @param {String} nickname 게시글 생성 유저닉네임
         * @param {String} title 게시글 제목
         * @param {String} content 게시글 내용
         * @returns 생성 메세지 전달
         */
    createMeeting = async(userId,nickname,title,content)=>{
        if(!title || !content){
            throw new InvalidParamsError("제목이나 내용을 기입해주세요!")
        }
        await this.meetingRepository.createMeeting(userId,nickname,title,content)
        return {result:true, message : "게시글이 생성되었습니다."};
    }

    /**게시글 수정 서비스
     * @param {Number} meetingId 수정할 게시글 ID
     * @param {Number} userId 수정요청하는 유저ID
     * @param {String} title 수정할 제목
     * @param {String} content 수정할 내용
     * @returns 수정완료 메세지 전달
     */
    updateMeeting = async(meetingId,userId,title,content) =>{
        const updatemeeting = await this.meetingRepository.findOneMeeting(meetingId,userId);
        if(!title || !content){
            throw new InvalidParamsError( "제목이나 내용을 기입해주세요!")
        }
        if(!updatemeeting){
            throw new ValidationError("게시글을 찾을 수 없습니다.")
        }
        await this.meetingRepository.updateMeeting(meetingId,userId,title,content);
        return {result: true, message: "게시글 수정했습니다."}
        }

        /**게시글 삭제 서비스
         * @param {Number} meetingId 삭제할 게시글ID
         * @param {Number} userId 삭제 요청한 유저ID
         * @returns 삭제완료 메세지 전달
         */
    deleteMeeting = async(meetingId,userId)=>{
        const deletemeeting = await this.meetingRepository.findOneMeeting(meetingId,userId);
        if(!deletemeeting){
            throw new ValidationError("게시글을 찾을 수 없습니다.")
        }
        if(deletemeeting.userId !==userId){
            throw new ValidationError( "권한이 없습니다.")
        }
        await this.meetingRepository.deleteMeeting(meetingId,userId);
        return {result : true, message : "게시글이 삭제되었습니다."}
    }


/**
 * 
 * 이미지url을 DB에 저장할 필요가 없어 보입니다.
 * 
    uploadImages = async(imageUrls, userId, meetingId)=> {
        const foundData = await this.meetingRepository.findOneMeeting(meetingId,userId);
        if(!foundData){
            throw new ValidationError("게시글을 찾을 수 없습니다.")
        }

        const uploadedImages = imageUrls.join()

        const uploadImagesData = await this.meetingRepository.uploadImages(uploadedImages, userId, meetingId)
        return uploadImagesData
    }
    */

}
module.exports = MeetingsService;