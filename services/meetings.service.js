const MeetingsRepository = require('../repositories/meetings.repository');

class MeetingsService {
    meetingRepository = new MeetingsRepository();

    findAllMeeting = async ()=>{
        try{
            const findallmeeting = await this.meetingRepository.findAllMeeting();
            findallmeeting.sort((a,b)=>{
                return b.createdAt - a.createdAt;
            });
                return findallmeeting
        }catch(error){
            res.status(400).json({msg : "error"})  
        }
    };

    findOneMeeting = async(meetingId)=>{
        const findonemeeting = await this.meetingRepository.findOneMeeting(meetingId)
        try{
            return {
                meetingId: findonemeeting.meetingId,
                email : findonemeeting.email,
                title : findonemeeting.title,
                content : findonemeeting.content,
                createdAt: findonemeeting.createdAt,
                updatedAt: findonemeeting.updatedAt,
                likeCount : findonemeeting.likeCount,
                participateCount :findonemeeting.participateCount
            }  
        }catch(error){
            res.status(400).json({msg : "error"})  
        }
    }

    createMeeting = async(userId,title,content)=>{
        if(title === undefined || content === undefined){
            res.status(400).json({message : "제목이나 내용을 기입해주세요!"})
        }
        await this.meetingRepository.createMeeting(userId,title,content)
        return {result:true, message : "게시글이 생성되었습니다."};
    }

    updateMeeting = async(meetingId,userId,title,content) =>{
        const updatemeeting = await this.meetingRepository.findOneMeeting(meetingId,userId);
        if(title === undefined || content === undefined){
            res.stauts(400).json({message : "제목이나 내용을 기입해주세요!"})
        }
        if(!updatemeeting){
            res.status(400).json({message : "게시글을 찾을 수 없습니다."})
        }
        else{
            await this.meetingRepository.updateMeeting(meetingId,userId,title,content);
            return {result: true, message: "게시글 수정했습니다."}
        }
    }

    deleteMeeting = async(meetingId,userId)=>{
        const deletemeeting = await this.meetingRepository.findOneMeeting(meetingId,userId);
        if(!deletemeeting){
            res.status(400).json({message : "게시글을 찾을 수 없습니다."})
        }else{
            await this.meetingRepository.deleteMeeting(meetingId,userId);
            return {result : true, message : "게시글이 삭제되었습니다."}
        }
    }
}


module.exports = MeetingsService;