const multer = require("../util/multer");

class ImagesController {
  uploadImage = async (req, res) => {
    try {
      console.log(req.file);
      const image = req.file.location;
      if (!image) {
        es.status(400).send({ message: "이미지가 없다." });
        return;
      }
      res.status(200).json({ image: image });
    } catch (error) {
      next(error);
    }
  };

  uploadImages = async (req, res) => {
    try {
      const image = req.files;
      const path = image.map((img) => img.location);
      if (!image) {
        res.status(400).send({ message: "이미지가 없다." });
        return;
      }
      res.status(200).send(path);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ImagesController;
