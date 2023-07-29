import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineDownload,
  AiOutlineShareAlt
} from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import "../Style/Gallery.css";
import {handleLike,handleDislike,showToastError,showToastSuccess} from "./Gallery/Like_Dislike.js"
import { handleDownload, handleShare, formatDateTime } from "./Gallery/Utils";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filterByName, setFilterByName] = useState("");
  const [likeCounts, setLikeCounts] = useState({});
  const [dislikeCounts, setDislikeCounts] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState({});
  const [searchInput, setSearchInput] = useState([]);
  

  let userName = localStorage.getItem("userName");

  const handlePostComment = async (itemId) => {
    console.log(itemId);
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showToastError("Please Login first to comment");
      return;
    }
    const commentData = {
      comment: {
        comment: commentInput,
        author: userName,
      },
    };
    try {
      const response = await axios.post(
        `https://cute-bass-life-jacket.cyclic.app/comments/${itemId}`,
        commentData
      );
      if (response.status === 200) {
        showToastSuccess("Comment posted successfully!");
        setCommentInput("");
        fetchGalleryItems();
      } else {
        console.error("Failed to post comment:", response.status);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, [sortBy, filterByName,searchInput]);

  const fetchGalleryItems = () => {
    axios
      .get(
        `https://cute-bass-life-jacket.cyclic.app/images?sortBy=${sortBy}&filterByName=${filterByName}&searchText=${searchInput}`
      )
      .then((response) => {
        setGalleryItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gallery images:", error);
      });
  };
  const handlePost = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showToastError("Please Login first to post");
      return;
    }
    const formData = new FormData();
    formData.append("text", textInput);
    formData.append("image", imageInput);
    formData.append("userName", userName);
    try {
      const response = await fetch("https://cute-bass-life-jacket.cyclic.app/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        showToastSuccess("Post successful!");
        console.log("Post successful!");
        setTextInput("");
        setImageInput(null);
        axios
          .get("https://cute-bass-life-jacket.cyclic.app/images")
          .then((response) => {
            setGalleryItems(response.data);
            response.data.forEach((item) => {
              console.log(item._id);
            });
          })
          .catch((error) => {
            console.error("Error fetching gallery images:", error);
          });
      } else {
        console.error("Failed to post:", response.status);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const getFilteredAndSortedItems = () => {
    if (sortBy === "" && filterByName === "") {
      return galleryItems;
    } else if (sortBy === "latest") {
      return [...galleryItems].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "oldest") {
      return [...galleryItems].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (filterByName === "A-Z") {
      return [...galleryItems].sort((a, b) =>
        a.userName.localeCompare(b.userName)
      );
    } else if (filterByName === "Z-A") {
      return [...galleryItems].sort((a, b) =>
        b.userName.localeCompare(a.userName)
      );
    } else {
      return galleryItems;
    }
  };

  const filteredAndSortedItems = getFilteredAndSortedItems();

  console.log(filteredAndSortedItems);
  return (
    <div className="image-gallery">
      <ToastContainer />
      <div className="box left-box">
        <div>
          <p>Filter by:</p>
          <select
            name=""
            id=""
            onChange={(e) => setFilterByName(e.target.value)}
            value={filterByName}
          >
            <option value="">Filter by name</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            {/* Add more filter options based on your data */}
          </select>
          <p>Sort by:</p>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="">Sort by time</option>
            <option value="latest">Time (Latest to Oldest)</option>
            <option value="oldest">Time (Oldest to Latest)</option>
            {/* Add more sorting options if needed */}
          </select>
        </div>
      </div>
      <div className="box middle-box">
        <div className="gallery_search">
          <input
            type="text"
            placeholder="Search by Username, name, and text...."
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="box comment-box">
          <div className="post">
            <input
              type="text"
              placeholder="Write Something here...."
              className="input_box"
              id="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <input
              type="file"
              id="image"
              onChange={(e) => setImageInput(e.target.files[0])}
            />
            <button onClick={handlePost}>Post</button>
          </div>
        </div>
        <div className="posted_data">
          {filteredAndSortedItems.map((item, index) => (
            <div key={index} className="displayed">
              <div className="profile-icon" title="Change profile picture">
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6tKFAxceZRcVHubzGHxl0LLnZCKZL7f7sYVWgYzCGQ&s`}
                  alt="profile-pic"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </div>
              <p className="userName">{item.userName}</p>
              <p className="DataAndTime">{formatDateTime(item.createdAt)}</p>
              <p className="comment">{item.text}</p>
              <img
                src={`data:image/jpeg;base64,${item.data}`}
                alt="icon"
                id="posted_image"
              />
              <div className="displayed_icon">
                <div className="react_icon">
                  <AiFillLike
                    size={22}
                    color="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLike(item._id, setLikeCounts)}
                  />
                  <span className="counter">
                    {likeCounts[item._id] || item.likes}
                  </span>

                  <AiFillDislike
                    size={22}
                    color="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDislike(item._id, setDislikeCounts)}
                  />
                  <span className="counter">
                    {dislikeCounts[item._id] || item.dislikes}
                  </span>

                  <AiOutlineDownload
                    size={22}
                    color="blue"
                    onClick={() => handleDownload(item.data, item.name)}
                    style={{ cursor: "pointer" }}
                  />
                  <AiOutlineShareAlt
                    size={22}
                    color="green"
                    onClick={() => handleShare(item.data)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div>
                  <div className="comment_section">
                    <input
                      type="text"
                      placeholder="Write your comment here..."
                      className="write_comment"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button onClick={() => handlePostComment(item._id)}>
                      Comment
                    </button>
                  </div>
                  <details>
                    <summary
                      onClick={() =>
                        setShowComments((prev) => ({
                          ...prev,
                          [item._id]: !prev[item._id],
                        }))
                      }
                    >
                      {showComments[item._id] ? "View less..." : "View more..."}
                    </summary>
                    {showComments[item._id] && (
                      <div>
                        {item.comments.length === 0 ? (
                          <p>No Comments</p>
                        ) : (
                          item.comments.map((comment, commentIndex) => (
                            <div key={commentIndex}>
                              <p>
                                {comment.author}:-:
                                {formatDateTime(comment.createdAt)}
                              </p>
                              <p>{comment.comment}</p>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </details>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="box right-box">
        <div>third box</div>
      </div>
    </div>
  );
}
