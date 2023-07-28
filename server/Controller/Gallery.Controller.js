const GalleryModel = require("../Model/Gallery.Model.js");

const uploadImage = (req, res) => {
    const { text, userName } = req.body;
    const newGallery = new GalleryModel({
        userName: userName,
        text: text,
        name: req.file.originalname,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        },
        comments: []
    });
    newGallery
        .save()
        .then((savedGallery) => {
            res.json({
                _id: savedGallery._id,
                userName: savedGallery.userName,
                text: savedGallery.text,
                name: savedGallery.name,
                image: {
                    data: savedGallery.image.data.toString("base64"),
                    contentType: savedGallery.image.contentType,
                },
                likes: savedGallery.likes,
                dislikes: savedGallery.dislikes,
                // Include the comments in the response
                comments: savedGallery.comments
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("An error occurred during file upload.");
        });
};


const getImages = (req, res) => {
    const { sortBy, filterByName, searchText } = req.query;
    let sortOption = {};

    // Sorting
    if (sortBy === "latest") {
        sortOption.createdAt = -1; // Sort by createdAt field in descending order (latest to oldest)
    } else if (sortBy === "oldest") {
        sortOption.createdAt = 1; // Sort by createdAt field in ascending order (oldest to latest)
    }

    const filterOption = {};
    if (filterByName === "A-Z") {
        filterOption.name = 1; // A-Z: ascending
    } else if (filterByName === "Z-A") {
        filterOption.name = -1; // Z-A: descending
    }

    const searchQuery = searchText
        ? {
            $or: [
                { userName: { $regex: searchText, $options: "i" } }, // Case-insensitive search on userName field
                { text: { $regex: searchText, $options: "i" } }, // Case-insensitive search on text field
                { name: { $regex: searchText, $options: "i" } }, // Case-insensitive search on name field
            ],
        }
        : {};

    GalleryModel.find(searchQuery)
        .sort(sortOption)
        .then((galleryItems) => {
            if (filterOption.name !== undefined) {
                galleryItems = galleryItems.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) return filterOption.name;
                    if (nameA > nameB) return -filterOption.name;
                    return 0;
                });
            }

            const images = galleryItems.map((item) => {
                return {
                    _id: item._id,
                    userName: item.userName,
                    text: item.text,
                    name: item.name,
                    likes: item.likes,
                    dislikes: item.dislikes,
                    comments: item.comments, // Include the comments field in the response
                    data: item.image.data.toString("base64"),
                    contentType: item.image.contentType,
                    createdAt: item.createdAt,
                };
            });
            res.json(images);
        })
        .catch((err) => {
            console.error("Error:", err);
            res.status(500).send("An error occurred while fetching gallery images.");
        });
};


const addComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const _id = req.params._id; 
        if (!comment) {
            return res.status(400).json({ error: "Comment is required." });
        }
        const galleryDoc = await GalleryModel.findById(_id);
        if (!galleryDoc) {
            return res.status(404).json({ error: "Gallery item not found." });
        }
        galleryDoc.comments.push(comment);
        const updatedGalleryDoc = await galleryDoc.save();
        res.json(updatedGalleryDoc.comments); 
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred while processing the request.");
    }
};



const getCommentsByItemId = (req, res) => {
    const _id = req.params.id;
    GalleryModel.findById(_id)
        .then((galleryDoc) => {
            if (!galleryDoc) {
                return res.status(404).json({ error: "Gallery item not found." });
            }
            const comments = galleryDoc.comments;
            res.json(comments);
        })
        .catch((err) => {
            console.error("Error fetching document:", err);
            res.status(500).send("An error occurred while fetching the gallery item.");
        });
};

const likeImage = (req, res) => {
    const { imageId } = req.params;
    GalleryModel.findById(imageId)
        .then((image) => {
            if (!image) {
                return res.status(404).json({ error: "Image not found." });
            }

            if (image.likes === 0) {
                // If likes count is zero, increase likes by one
                image.increaseLikes().then((updatedImage) => {
                    res.json({
                        likes: updatedImage.likes,
                        dislikes: updatedImage.dislikes,
                    });
                });
            } else if (image.dislikes === 0) {
                image.increaseDislikes().then((updatedImage) => {
                    res.json({
                        likes: updatedImage.likes,
                        dislikes: updatedImage.dislikes,
                    });
                });
            } else {
                if (image.likes > 0) {
                    image.decreaseLikes().then((updatedImage) => {
                        image.increaseDislikes().then((updatedImage) => {
                            res.json({
                                likes: updatedImage.likes,
                                dislikes: updatedImage.dislikes,
                            });
                        });
                    });
                } else {
                    image.decreaseDislikes().then((updatedImage) => {
                        image.increaseLikes().then((updatedImage) => {
                            res.json({
                                likes: updatedImage.likes,
                                dislikes: updatedImage.dislikes,
                            });
                        });
                    });
                }
            }
        })
        .catch((err) => {
            console.error("Error:", err);
            res.status(500).send("An error occurred while processing the like.");
        });
};

const dislikeImage = (req, res) => {
    const { imageId } = req.params;
    GalleryModel.findById(imageId)
        .then((image) => {
            if (!image) {
                return res.status(404).json({ error: "Image not found." });
            }

            if (image.dislikes === 0) {
                // If dislikes count is zero, increase dislikes by one
                image.increaseDislikes().then((updatedImage) => {
                    res.json({
                        likes: updatedImage.likes,
                        dislikes: updatedImage.dislikes,
                    });
                });
            } else if (image.likes === 0) {
                // If likes count is zero, increase likes by one
                image.increaseLikes().then((updatedImage) => {
                    res.json({
                        likes: updatedImage.likes,
                        dislikes: updatedImage.dislikes,
                    });
                });
            } else {
                // Switch from like to dislike or vice versa
                if (image.dislikes > 0) {
                    image.decreaseDislikes().then((updatedImage) => {
                        image.increaseLikes().then((updatedImage) => {
                            res.json({
                                likes: updatedImage.likes,
                                dislikes: updatedImage.dislikes,
                            });
                        });
                    });
                } else {
                    image.decreaseLikes().then((updatedImage) => {
                        image.increaseDislikes().then((updatedImage) => {
                            res.json({
                                likes: updatedImage.likes,
                                dislikes: updatedImage.dislikes,
                            });
                        });
                    });
                }
            }
        })
        .catch((err) => {
            console.error("Error:", err);
            res.status(500).send("An error occurred while processing the dislike.");
        });
};

module.exports = {
    uploadImage,
    getImages,
    likeImage,
    dislikeImage,
    addComment,
    getCommentsByItemId
};
