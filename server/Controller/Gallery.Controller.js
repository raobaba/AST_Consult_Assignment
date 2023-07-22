const GalleryModel = require('../Model/Gallery.Model');
const uploadImage = (req, res) => {
    const newGallery = new GalleryModel({
        name: req.file.originalname,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        },
    });

    newGallery
        .save()
        .then(() => res.send('Successfully Uploaded'))
        .catch((err) => {
            console.error(err); // Log the error for debugging
            res.status(500).send('An error occurred during file upload.');
        });
};

const getImages = (req, res) => {
    GalleryModel.find({})
        .then((galleryItems) => {
            console.log('Gallery items:', galleryItems); // Log the gallery items for debugging
            const images = galleryItems.map((item) => {
                return {
                    name: item.name,
                    data: item.image.data.toString('base64'), // Convert image buffer to base64 string
                    contentType: item.image.contentType,
                };
            });
            res.json(images);
        })
        .catch((err) => {
            console.error('Error:', err); // Log the error for debugging
            res.status(500).send('An error occurred while fetching gallery images.');
        });
};

module.exports = {
    uploadImage,
    getImages,
};
