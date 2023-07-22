const express = require('express');
const multer = require('multer');
const {SignUp,Login} = require('../Controller/User.Controller');

const UserRouter = express.Router();

const Storage = multer.memoryStorage();

const upload = multer({
    storage: Storage
}).single('image');

UserRouter.post('/signup', upload, SignUp);
UserRouter.post('/login',Login)
module.exports = UserRouter;
