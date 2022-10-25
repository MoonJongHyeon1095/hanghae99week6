const { ValidationError } = require("../exceptions/index.exception");
const ParticipateRepository = require("../repositories/participates.repository");
const MeetingsRepository = require("../repositories/meetings.repository");

class ParticipatesService {
  constructor() {
    this.participateRepository = new ParticipateRepository();
    this.meetingRepository = new MeetingsRepository();
  }

  /** 요청한 유저의 해당 게시글 참여정보 가져오기
   * @param userId 요청한 유저 ID
   * @param meetingId 조회할 게시글ID
   */
  findOneParty = async ({ userId, meetingId }) => {
    return await this.participateRepository.findOneParty({ userId, meetingId });
  };

  /**참여하기
   * @param userId 참여할 유저ID
   * @param meetingId 참여할 게시글ID
   * @param nickname 참여할 유저 닉네임
   */
  joinParty = async ({ userId, meetingId, nickname }) => {
    //게시글이 존재하는지 확인 없을시 에러
    const findMeeting = await this.meetingRepository.findOneMeeting(meetingId);
    if (!findMeeting) {
      throw new ValidationError("존재하지 않는 게시글 입니다");
    }

    const Party = await this.participateRepository.findOneParty({
      userId,
      meetingId,
    });

    if (!Party) {
      await this.participateRepository.joinParty({
        userId,
        meetingId,
        nickname,
      });
      await this.participateRepository.upPartyCount({ meetingId });
    }
  };

  /**참여취소
   * @param userId 취소할 유저ID
   * @param meetingId 취소할 게시글ID
   */
  cancelParty = async ({ userId, meetingId }) => {
    //게시글이 존재하는지 확인 없을시 에러
    const findMeeting = await this.meetingRepository.findOneMeeting(meetingId);
    if (!findMeeting) {
      throw new ValidationError("존재하지 않는 게시글 입니다");
    }

    const Party = await this.participateRepository.findOneParty({
      userId,
      meetingId,
    });

    if (Party) {
      await this.participateRepository.cancelParty({ userId, meetingId });
      await this.participateRepository.downPartyCount({ meetingId });
    }
  };

  /**요청한 유저의 참여한 게시글 모두가져오기
   *
   * @param userId 요청한 유저ID
   * @returns 참가한 게시글 목록
   */
  findAllParty = async ({ userId }) => {
    const findAllParty = await this.participateRepository.findAllParty({
      userId,
    });

    //참가한 게시글 모두 가져오기
    const findMeetingId = findAllParty.map((row) => row.meetingId);
    let data = [];
    let like;
    const AllMeetings = await this.participateRepository.findAllMeeting({
      findMeetingId,
    });

    //좋아요 정보유무에 따라 islike가 true or false
    const result = AllMeetings.forEach((meeting) => {
      meeting.Likes.length ? (like = true) : (like = false);
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
        islike: like,
      });
    });
    data.push(result);

    return data;
  };
}

module.exports = ParticipatesService;
