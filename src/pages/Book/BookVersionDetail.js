//BookVersionDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function replaceLocalhost(url) {
    return url.replace('192.168.3.52:7791', 'nas.wichaipan.cn');
}

const BookVersionDetail = () => {
    const { boid, verid } = useParams();
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`http://43.143.114.225:8000/api/get-book-photos/${boid}/${verid}`)
            .then(response => {
                console.log('=====')
                console.log(response.data)
                const updatedImages = response.data.map(photo => ({
                    original: replaceLocalhost(photo.bo_ph_url),
                    thumbnail: replaceLocalhost(photo.bo_ph_url),
                })).reverse();// 反转数组顺序
                setImages(updatedImages);
                
            })
            .catch(error => {
                console.error('Error fetching book photos:', error);
            });
    }, [boid, verid]);

    return (
        <div>
            <ImageGallery items={images} startIndex={images.length - 1}/>
        </div>
    );
};

export default BookVersionDetail;