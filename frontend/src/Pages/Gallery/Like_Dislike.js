import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastError = (message) => {
  toast.error(message);
};
export const showToastSuccess = (message) => {
    toast.success(message);
  };
  


export const handleLike = (itemId, setLikeCounts) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    showToastError("Please Login first to like");
    return;
  }
  axios
    .put(`https://cute-bass-life-jacket.cyclic.app/like/${itemId}`)
    .then((response) => {
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [itemId]: response.data.likes,
      }));
    })
    .catch((error) => {
      console.error("Error liking item:", error);
    });
};
export const handleDislike = (itemId, setDislikeCounts) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        showToastError("Please Login first to dislike");
      return;
    }
    axios
      .put(`https://cute-bass-life-jacket.cyclic.app/dislike/${itemId}`)
      .then((response) => {
        setDislikeCounts((prevCounts) => ({
          ...prevCounts,
          [itemId]: response.data.dislikes,
        }));
      })
      .catch((error) => {
        console.error("Error disliking item:", error);
      });
  };