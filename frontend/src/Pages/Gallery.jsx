import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/Gallery.css';

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/images')
      .then(response => {
        setGalleryItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching gallery images:', error);
      });
  }, []);

  // console.log(galleryItems);

  return (
    <div className="image-gallery">
      {galleryItems.map((item, index) => (
        <img
          key={index}
          src={`data:image/jpeg;base64,${item.data}`}
          alt="icon"
          style={{ maxWidth: "20%", height: "auto" }}
        />
      ))}
    </div>
  );
}

