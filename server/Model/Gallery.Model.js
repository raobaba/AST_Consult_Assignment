const mongoose = require('mongoose');

const GallerySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

const GalleryModel = mongoose.model('Gallery', GallerySchema);
module.exports = GalleryModel;
