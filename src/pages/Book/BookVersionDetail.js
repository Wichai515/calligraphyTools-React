//BookVersionDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";


function replaceLocalhost(url) {
  return url.replace('192.168.3.52:7791', 'nas.wichaipan.cn');
}

const CustomImageComponent = ({ src, initialPositionX }) => (
  <TransformWrapper initialPositionX={initialPositionX}>
    <TransformComponent>
      <img src={src} alt="detail" />
    </TransformComponent>
  </TransformWrapper>
);

const CustomImageGallery = ({ items, initialPositionX }) => {
  return (
    <ImageGallery
      items={items}
      startIndex={items.length - 1}
      renderItem={(item) => (
        <div className="image-gallery-image"
          style={{ height: '100%', display: "flex", justifyContent: 'center', alignItems: 'center' }}
          >
          <CustomImageComponent src={item.original} initialPositionX={initialPositionX} />
          <div className="image-gallery-description">{item.description}</div>
        </div>
      )}
    />
  );
}


const BookVersionDetail = () => {
  const { boid, verid } = useParams();
  const [images, setImages] = useState([]);
  const [initialPositionX, setInitialPositionX] = useState(0);

  useEffect(() => {
    axios.get(`http://43.143.114.225:8000/api/get-book-photos/${boid}/${verid}`)
      .then(response => {
        console.log('=====')
        console.log(response.data)
        const updatedImages = response.data.data.map(photo => ({
          original: replaceLocalhost(photo.bo_ph_url),
          thumbnail: replaceLocalhost(photo.bo_ph_url),
        })).reverse();// 反转数组顺序
        setImages(updatedImages);

        // 获取图片宽度并设置initialPositionX
        const image = new Image();
        image.src = updatedImages[0].original; // 假设获取第一张图片的宽度
        image.onload = () => {
          const imageWidth = image.width;
          setInitialPositionX(-imageWidth); // 设置为图片宽度的负值
        }

      })
      .catch(error => {
        console.error('Error fetching book photos:', error);
      });
  }, [boid, verid]);

  return (
    <div style={{
      // minHeight: '100vh', 
      // display: "flex", 
      // justifyContent: 'center', 
      // alignItems: 'center'
    }}>
      <CustomImageGallery items={images} initialPositionX={initialPositionX} />
      {/* <p>{initialPositionX}</p> */}
    </div>
  );
};

export default BookVersionDetail;