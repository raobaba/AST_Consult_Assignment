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

  return (
    <div className="image-gallery">
      <div className="box left-box">
        <div>first box</div>
      </div>
      <div className="box middle-box">
        {galleryItems.map((item, index) => (
          <img
            key={index}
            src={`data:image/jpeg;base64,${item.data}`}
            alt="icon"
          />
        ))}
      </div>
      <div className="box right-box">
        <div>third box</div>
      </div>
    </div>
  );
}
