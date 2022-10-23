const multer = require("../util/multer");

class ImagesController {
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
      const images = req.files
      const imageUrls = images.map((img) => img.location);

      if (!images) {
        res.status(400).send({ message: "이미지가 없다." });
        return;
      }
      res.status(200).send(imageUrls);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ImagesController;
