const express = require("express");
const {
  CreateComment,
  getCommentsByGalleryId,
  increaseLikes,
  decreaseLikes,
} = require("../Controller/Comment.Controller.js"); // Fix the import here

const CommentRouter = express.Router();

CommentRouter.post("/comment", CreateComment);
CommentRouter.get("/comments/:galleryId", getCommentsByGalleryId);
CommentRouter.put('/comments/:commentId/like', increaseLikes);
CommentRouter.put('/comments/:commentId/dislike', decreaseLikes);

module.exports = CommentRouter;
