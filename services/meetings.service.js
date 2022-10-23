const { InvalidParamsError, ValidationError } = require('../exceptions/index.exception');
const MeetingsRepository = require('../repositories/meetings.repository');

class MeetingsService {
    meetingRepository = new MeetingsRepository();

    findAllMeeting = async ()=>{
        
        const findallmeeting = await this.meetingRepository.findAllMeeting();
        findallmeeting.sort((a,b)=>{
                return b.createdAt - a.createdAt;
            });
            console.log(findallmeeting);
                return findallmeeting
                
        }

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
    createMeeting = async(userId,nickname,title,content)=>{
        if(!title || !content){
            throw new InvalidParamsError("제목이나 내용을 기입해주세요!")
        }
        await this.meetingRepository.createMeeting(userId,nickname,title,content)
        return {result:true, message : "게시글이 생성되었습니다."};
    }

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


    uploadImages = async(imageUrls, userId, meetingId)=> {
        const foundData = await this.meetingRepository.findOneMeeting(meetingId,userId);
        if(!foundData){
            throw new ValidationError("게시글을 찾을 수 없습니다.")
        }

        const uploadedImages = imageUrls.join()

        const uploadImagesData = await this.meetingRepository.uploadImages(uploadedImages, userId, meetingId)
        return uploadImagesData
    }

}
module.exports = MeetingsService;