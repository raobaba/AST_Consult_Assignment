// Utils.js
export const handleDownload = (imageData, imageName) => {
  const link = document.createElement("a");
  link.href = `data:image/jpeg;base64,${imageData}`;
  link.download = imageName || "image.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleShare = (imageData) => {
  alert("Share image data: " + imageData);
};

export const formatDateTime = (isoString) => {
  const dateTime = new Date(isoString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(dateTime);
};
