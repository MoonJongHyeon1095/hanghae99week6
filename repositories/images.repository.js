const { Images, Meetings } = require("../models");

class ImagesRepository {
  /**좋아요 요청한 게시글 찾아오기
   * @param userId 좋아요한거 찾아올 유저ID
   * @param meetingId 좋아요 요청한 게시글ID
   */

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
    await Images.create({ imageUrl, userId, meetingId });
  };
}
module.exports = ImagesRepository;
