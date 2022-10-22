const{Meetings} = require('../models');

class MeetingsRepository{

//게시글 전체목록조회
findAllMeeting = async ()=>{
    try{
        return await Meetings.findAll({})
    }catch(error){
        res.status(400).json({msg : "error"})      
    }
}
//게시글 단일조회
findOneMeeting = async (meetingId)=>{
    try{
        return await Meetings.findOne({where : {meetingId}})       
    }catch(error){
        res.status(400).json({msg : "error"})  
    }
}

//게시글 작성
createMeeting = async (userId,nickname,title,content)=>{
    await Meetings.create({userId,nickname,title,content})  
}

//게시글 수정
updateMeeting = async (meetingId,userId,title,content)=>{
    await Meetings.update({title,content},{where:{meetingId,userId}})
}

//게시글 삭제
deleteMeeting = async (meetingId,userId)=>{
    await Meetings.destroy({where:{meetingId,userId}})
    }
}

module.exports = MeetingsRepository;