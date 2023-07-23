const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    galleryId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to increase likes
CommentSchema.methods.increaseLikes = function () {
    this.likes += 1;
    return this.save();
};

// Method to decrease likes
CommentSchema.methods.decreaseLikes = function () {
    if (this.likes > 0) {
        this.likes -= 1;
    }
    return this.save();
};



const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;
