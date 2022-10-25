const{Meetings, Likes, Participates, Users} = require('../models');

class MeetingsRepository{

/**게시글 전체조회 */
findAllMeeting = async ()=>{
    return await Meetings.findAll({})
}

/**게시글 단일조회
 * @param {Number} meetingId 조회할 게시글ID
 * @returns 조회한 게시글
 */
findOneMeeting = async (meetingId)=>{
    return await Meetings.findOne({
        where : {meetingId},include: {model: Participates, as: 'Participates'}
    });
}

/**게시글 생성
 * @param {Number} userId 작성자ID
 * @param {String} nickname 작성자nickname
 * @param {String} title 게시글 제목
 * @param {String} content 게시글 내용
 */
createMeeting = async (userId,nickname,title,content)=>{
    await Meetings.create({userId,nickname,title,content})  
}

/**게시글 수정
 * @param {Number} meetingId 수정할 게시글ID
 * @param {Number} userId 수정요청한 유저iD
 * @param {String} title 수정할 제목
 * @param {String} content 수정할 내용
 */
updateMeeting = async (meetingId,userId,title,content)=>{
    await Meetings.update({title,content},{where:{meetingId,userId}})
}

/**게시글 삭제
 * @param {Number} meetingId 삭제할 게시글ID
 * @param {Number} userId 삭제요청한 유저ID
 */
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