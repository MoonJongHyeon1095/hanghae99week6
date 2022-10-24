const{Meetings, Likes} = require('../models');

class MeetingsRepository{

//게시글 전체목록조회
findAllMeeting = async ()=>{
    return await Meetings.findAll({})
};


//게시글 단일조회
findOneMeeting = async (meetingId)=>{
    return await Meetings.findOne({
        where : {meetingId},
    });
}

//유저가 좋아요를 눌렀는지 조회
findOneLike = async (userId, meetingId) =>{
    const findOneLike = await Likes.findOne({ where: { userId, meetingId } });
    return findOneLike;
};



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

/**
 * 이미지url을 DB에 저장할 필요가 없어 보입니다.
 * 
//이미지 업로드
uploadImages = async (uploadedImages, userId, meetingId) => {
    await Meetings.update({imageUrls : uploadedImages},{where:{meetingId,userId}})
}
*/

}

module.exports = MeetingsRepository;