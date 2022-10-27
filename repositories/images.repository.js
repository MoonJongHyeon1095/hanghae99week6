const { Images } = require("../models");

class ImagesRepository {

  //게시글 이미지 조회
  findAllImages = async ( meetingId ) => {
    const findAllImage = await Images.findAll({ where: { meetingId } });
    return findAllImage;
  };


  //이미지 삭제
  deleteImage = async ( imageUrl ) => {
    const deleteImage = await Images.destroy({ where: { imageUrl } });
    return deleteImage;
  };

  //이미지 업로드
  uploadImages = async (imageUrl, userId, meetingId) => {
    const uploadImagesData = await Images.create({ imageUrl : imageUrl, userId: userId, meetingId : meetingId });
    return uploadImagesData
  };
}
module.exports = ImagesRepository;
