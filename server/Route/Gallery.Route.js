const express = require('express');
const multer = require('multer');
const { uploadImage, getImages,likeImage, dislikeImage,addComment,getCommentsByItemId} = require('../Controller/Gallery.Controller');

const GalleryRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

GalleryRouter.post('/upload', upload, uploadImage);
GalleryRouter.get('/images', getImages);
GalleryRouter.post('/comments/:_id',addComment)
GalleryRouter.get('/comments/:_id',getCommentsByItemId)
GalleryRouter.put('/like/:imageId',likeImage);
GalleryRouter.put('/dislike/:imageId',dislikeImage);

module.exports = GalleryRouter;
