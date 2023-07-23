import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineDownload,
  AiOutlineShareAlt,
} from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import "../Style/Gallery.css";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [imageInput, setImageInput] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/images")
      .then((response) => {
        setGalleryItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gallery images:", error);
      });
  }, []);

  const handlePost = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showToastMessage("Please Login first to post");
      return;
    }

    const formData = new FormData();
    formData.append("text", textInput);
    formData.append("image", imageInput);
    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Post successful!");
        setTextInput("");
        setImageInput(null);
        axios
          .get("http://localhost:8000/images")
          .then((response) => {
            setGalleryItems(response.data);
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
  const showToastMessage = (message) => {
    toast.error(message); 
  };
  const handleDownload = (imageData, imageName) => {
    const link = document.createElement("a");
    link.href = `data:image/jpeg;base64,${imageData}`;
    link.download = imageName || "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (imageData) => {
    alert("Share image data: " + imageData);
  };

  console.log(galleryItems);

  return (
    <div className="image-gallery">
      <ToastContainer /> {/* Add the ToastContainer at the top level */}
      <div className="box left-box">
        <div>first box</div>
      </div>
      <div className="box middle-box">
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
          {galleryItems.length === 0 && (
            <div className="no_comments">No Comments</div>
          )}
          {galleryItems.map((item, index) => (
            <div key={index} className="displayed">
              <p>{item.text}</p>
              <img
                src={`data:image/jpeg;base64,${item.data}`}
                alt="icon"
                id="posted_image"
              />
              <div className="displayed_icon">
                <div className="react_icon">
                  <AiFillLike size={22} color="blue" />
                  <AiFillDislike size={22} color="blue" />
                  <AiOutlineDownload
                    size={22}
                    color="blue"
                    onClick={() => handleDownload(item.data, item.name)}
                  />
                  <AiOutlineShareAlt
                    size={22}
                    color="green"
                    onClick={() => handleShare(item.data)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Write your comment here..."
                  className="write_comment"
                />
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
