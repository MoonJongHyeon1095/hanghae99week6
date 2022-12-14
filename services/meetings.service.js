const {
  InvalidParamsError,
  ValidationError,
} = require("../exceptions/index.exception");

const MeetingsRepository = require("../repositories/meetings.repository");

class MeetingsService {
  meetingRepository = new MeetingsRepository();

  findAllMeeting = async (userId) => {
    let data = [];
    let isLike;
    const AllMeetings = await this.meetingRepository.findAllMeeting();

    for (const meeting of AllMeetings) {
      const meetingId = meeting.meetingId;
      const foundOneLike = await this.meetingRepository.findOneLike(
        userId,
        meetingId
      );
      if (foundOneLike) {
        isLike = true;
      } else if (!foundOneLike) {
        isLike = false;
      }
      data.push({
        meetingId: meeting.meetingId,
        userId: meeting.userId,
        nickname: meeting.nickname,
        title: meeting.title,
        content: meeting.content,
        createdAt: meeting.createdAt,
        updatedAt: meeting.updatedAt,
        participateCount: meeting.participateCount,
        likeCount: meeting.likeCount,
        isLike,
      });
    }
    return data.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
  };

  findOneMeeting = async (userId, meetingId) => {
    const foundOneLike = await this.meetingRepository.findOneLike(
      userId,
      meetingId
    );

    const findonemeeting = await this.meetingRepository.findOneMeeting(
      meetingId
    );

    const participants = findonemeeting.Participates;
    const participantsList = [];
    for(const participant of participants ){
      const {userId} = participant
      const participatedUser = await this.meetingRepository.findById(userId)
      participantsList.push(participatedUser.email, participant.nickname)
    }


    let isLike;
    if (foundOneLike) {
      isLike = true;
    } else if (!foundOneLike) {
      isLike = false;
    }

    return {
      meetingId: findonemeeting.meetingId,
      userId: findonemeeting.userId,
      nickname: findonemeeting.nickname,
      title: findonemeeting.title,
      content: findonemeeting.content,
      createdAt: findonemeeting.createdAt,
      updatedAt: findonemeeting.updatedAt,
      likeCount: findonemeeting.likeCount,
      participateCount: findonemeeting.participateCount,
      isLike,
      participantsList,
    };
  };

  createMeeting = async (userId, nickname, title, content) => {
    if (!title || !content) {
      throw new InvalidParamsError("???????????? ????????? ??????????????????!");
    }
    await this.meetingRepository.createMeeting(
      userId,
      nickname,
      title,
      content
    );
    return { result: true, message: "???????????? ?????????????????????." };
  };

  updateMeeting = async (meetingId, userId, title, content) => {
    const updatemeeting = await this.meetingRepository.findOneMeeting(
      meetingId,
      userId
    );
    if (!title || !content) {
      throw new InvalidParamsError("???????????? ????????? ??????????????????!");
    }
    if (!updatemeeting) {
      throw new ValidationError("???????????? ?????? ??? ????????????.");
    }
    await this.meetingRepository.updateMeeting(
      meetingId,
      userId,
      title,
      content
    );
    return { result: true, message: "????????? ??????????????????." };
  };

  deleteMeeting = async (meetingId, userId) => {
    const deletemeeting = await this.meetingRepository.findOneMeeting(
      meetingId,
      userId
    );
    if (!deletemeeting) {
      throw new ValidationError("???????????? ?????? ??? ????????????.");
    }
    if (deletemeeting.userId !== userId) {
      throw new ValidationError("????????? ????????????.");
    }
    await this.meetingRepository.deleteMeeting(meetingId, userId);
    return { result: true, message: "???????????? ?????????????????????." };
  };

  /**
 * 
 * ?????????url??? DB??? ????????? ????????? ?????? ????????????.
 * 
    uploadImages = async(imageUrls, userId, meetingId)=> {
        const foundData = await this.meetingRepository.findOneMeeting(meetingId,userId);
        if(!foundData){
            throw new ValidationError("???????????? ?????? ??? ????????????.")
        }

        const uploadedImages = imageUrls.join()

        const uploadImagesData = await this.meetingRepository.uploadImages(uploadedImages, userId, meetingId)
        return uploadImagesData
    }
    */
};
module.exports = MeetingsService;
