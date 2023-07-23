const GalleryModel = require("../Model/Gallery.Model.js");

const uploadImage = (req, res) => {
  const { text } = req.body;
  const newGallery = new GalleryModel({
    text: text,
    name: req.file.originalname,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });
  newGallery
    .save()
    .then((savedGallery) => {
      res.json({
        _id: savedGallery._id,
        text: savedGallery.text,
        name: savedGallery.name,
        image: {
          data: savedGallery.image.data.toString("base64"),
          contentType: savedGallery.image.contentType,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred during file upload.");
    });
};

const getImages = (req, res) => {
  GalleryModel.find({})
    .then((galleryItems) => {
      const images = galleryItems.map((item) => {
        return {
          text: item.text,
          name: item.name,
          data: item.image.data.toString("base64"), // Convert image buffer to base64 string
          contentType: item.image.contentType,
        };
      });
      res.json(images);
    })
    .catch((err) => {
      console.error("Error:", err); // Log the error for debugging
      res.status(500).send("An error occurred while fetching gallery images.");
    });
};

module.exports = {
  uploadImage,
  getImages,
};
