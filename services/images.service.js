const ImagesRepository = require("../repositories/images.repository");
const MeetingsRepository = require("../repositories/meetings.repository");

class ImagesService {
  constructor() {
    this.imagesRepository = new ImagesRepository();
    this.meetingRepository = new MeetingsRepository();
  }

  //게시글 이미지 조회
  findAllImages = async (meetingId) => {
    const findAllImage = await this.imagesRepository.findAllImages(meetingId);
    return findAllImage;
  };

  //이미지 삭제
  deleteImage = async (imageUrl) => {
    const targetUrl = `https://hanghae99week6.s3.ap-northeast-2.amazonaws.com/${imageUrl}`
    const deleteImage = await this.imagesRepository.deleteImage(targetUrl);
    return deleteImage;
  };

  //이미지 업로드
  uploadImages = async (imageUrls, userId, meetingId) => {
    const foundData = await this.meetingRepository.findOneMeeting(
      meetingId,
      userId
    );
    if (!foundData) {
      throw new ValidationError("게시글을 찾을 수 없습니다.");
    }

    for (let i = 0; i < imageUrls.length; i++) {
      let imageUrl = imageUrls[i];
      
      await this.imagesRepository.uploadImages(imageUrl, userId, meetingId);
    }

    //const uploadedImages = imageUrls.join()

    //const uploadImagesData = await this.meetingRepository.uploadImages(uploadedImages, userId, meetingId)
    //return uploadImagesData
  };
}
module.exports = ImagesService;
