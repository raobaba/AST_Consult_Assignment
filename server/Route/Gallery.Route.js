const express = require('express');
const multer = require('multer');
const { uploadImage, getImages } = require('../Controller/Gallery.Controller');

const GalleryRouter = express.Router();

const Storage = multer.memoryStorage();

const upload = multer({
    storage: Storage
}).single('image');

GalleryRouter.post('/upload', upload, uploadImage);
GalleryRouter.get('/images', getImages);

module.exports = GalleryRouter;
