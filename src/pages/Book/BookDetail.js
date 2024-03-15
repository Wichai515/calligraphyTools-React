// BookDetail.jsx  

import React, { useEffect, useState } from 'react';
import { Card, Image, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // 假设你使用axios作为HTTP客户端  
import { Link } from 'react-router-dom';
import BookVersionCard from './components/BookVersionCard';

function replaceLocalhost(url) {
    return url.replace('192.168.3.52:7791', 'nas.wichaipan.cn');
  }
  

const BookDetail = () => {

    const { boid } = useParams(); // 获取路由参数中的 id
    const [bookVersions, setBookVersions] = useState([]); // 保存书籍版本数据

    useEffect(() => {
        // 在组件加载时获取书籍数据
        axios.get(`http://43.143.114.225:8000/api/get-book-photos/${boid}`)
          .then(response => {
            // 处理获取到的数据
            // 将获取到的书籍版本数据设置为组件的状态
            const updatedBookVersions = response.data.data.map(version => ({
                id: version.bo_ph_id,
                name: version.bo_ph_version,
                coverImageUrl: replaceLocalhost(version.bo_ph_url),
                // description: '', // 这里可以根据需要添加描述
              }));
              setBookVersions(updatedBookVersions);
          })
          .catch(error => {
            console.error('Error fetching book photos:', error);
          });
      }, [boid]); // 当 boid 变化时重新请求数据

    return (
        <div>
            <Row gutter={[16, 16]}>
                {bookVersions.map((version) => (
                    <Col key={version.id} span={6}>
                        <BookVersionCard version={version} boid={boid}/>
                    </Col>
                ))}
            </Row>
            
        </div>
    );
}

export default BookDetail;
