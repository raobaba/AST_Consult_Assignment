const CommentModel = require('../Model/Comment.Model.js');

const CreateComment = async (req, res) => {
  try {
    const { text, author, galleryId } = req.body;
    if (!text || typeof text !== 'string' || !author || typeof author !== 'string' || !galleryId || typeof galleryId !== 'string') {
      return res.status(400).json({ error: 'Invalid input data' });
    }
    const newComment = new CommentModel({
      text,
      author,
      galleryId,
    });
    await newComment.save();
    return res.status(201).json(newComment);
  } catch (err) {
    console.error('Error creating comment:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

const getCommentsByGalleryId = (req, res) => {
  const { galleryId } = req.params;
  CommentModel.find({ galleryId })
    .then((comments) => {
      res.json(comments || []);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred while fetching comments.');
    });
};

const increaseLikes = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await comment.increaseLikes();
    return res.status(200).json(comment);
  } catch (err) {
    console.error('Error increasing likes:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const decreaseLikes = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await comment.decreaseLikes();

    return res.status(200).json(comment);
  } catch (err) {
    console.error('Error decreasing likes:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  CreateComment,
  getCommentsByGalleryId,
  increaseLikes,
  decreaseLikes
};
