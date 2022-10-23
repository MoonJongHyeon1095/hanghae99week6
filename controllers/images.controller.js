const MeetingsService = require('../services/meetings.service');

class ImagesController {
  meetingsService = new MeetingsService();

  uploadImage = async (req, res, next) => {
    try {
      console.log(req.file);
      const imageUrl = req.file.location;
      if (!imageUrl) {
        es.status(400).send({ message: "이미지가 없다." });
        return;
      }
      res.status(200).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  };

  uploadImages = async (req, res, next) => {
    try {
      const{userId}= res.locals.user;
      const{meetingId}= req.params;
      console.log(meetingId)

      const images = req.files
      const imageUrls = images.map((img) => img.location);

      if (!images) {
        res.status(400).send({ message: "이미지가 없다." });
        return;
      }
           
      await this.meetingsService.uploadImages(imageUrls, userId, meetingId);
    
      res.status(200).send(imageUrls);
    } catch (error) {
      next(error);
    }
  };

  deleteImages = async(req, res, next) => {
    
  }
}

module.exports = ImagesController;
