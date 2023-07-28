// gallery.model.js

const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  comment: {
    type: String,
  },
  author: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GallerySchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
  },
  comments: {
    type: [CommentSchema], // Array of objects using CommentSchema
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Method to increase likes
GallerySchema.methods.increaseLikes = function () {
  this.likes += 1;
  return this.save();
};

// Method to decrease likes
GallerySchema.methods.decreaseLikes = function () {
  if (this.likes > 0) {
    this.likes -= 1;
    return this.save();
  } else {
    // If likes count is already 0, no need to save, just return the current state
    return Promise.resolve(this);
  }
};

// Method to increase dislikes
GallerySchema.methods.increaseDislikes = function () {
  if (this.dislikes === 0) {
    // If dislikes count is zero, increase dislikes by one
    this.dislikes += 1;
    return this.save();
  } else {
    // If dislikes count is already greater than 0, no need to save, just return the current state
    return Promise.resolve(this);
  }
};

// Method to decrease dislikes
GallerySchema.methods.decreaseDislikes = function () {
  if (this.dislikes > 0) {
    this.dislikes -= 1;
    return this.save();
  } else {
    // If dislikes count is already 0, no need to save, just return the current state
    return Promise.resolve(this);
  }
};

const GalleryModel = mongoose.model("Gallery", GallerySchema);

module.exports = GalleryModel;
