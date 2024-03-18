import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Card, Row, Col } from 'antd';
import AddNewCollect from './components/AddNewCollect';
import axios from 'axios';

const Collect = () => {
    const navigate = useNavigate();
    const promptShown = useRef(false);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`http://43.143.114.225:8000/api/get-collections/${token}/`)
                .then(response => {
                    // 倒序排列集字数据
                    setCollections(response.data.reverse());
                })
                .catch(error => {
                    console.error('Error fetching collections:', error);
                });
        } else if (!promptShown.current) {
            promptShown.current = true;
            Modal.confirm({
                title: '需要登录',
                content: '您需要登录才能继续使用集字功能，是否前往登录页面？',
                okText: '去登录',
                cancelText: '取消',
                onOk() {
                    navigate('/login');
                },
                onCancel() {
                    navigate('/');
                    localStorage.setItem('selectedMenuItem', '1');
                    window.location.reload();
                },
            });
        }
    }, [navigate]);

    // 将时间转换为北京时间的年月日格式
    const formatDateTime = dateTime => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 处理卡片点击事件
    const handleCardClick = coId => {
        navigate(`/collectiondisplay/${coId}`);
    };

    return (
        <div>
            {/* Collect */}
            <AddNewCollect />
            {/* Display historical collections */}
            <Row gutter={[16, 16]}>
                {collections.map(collection => (
                    <Col key={collection.co_id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            title={collection.co_title}
                            style={{ width: '100%' , cursor: 'pointer' }}
                            hoverable
                            onClick={() => handleCardClick(collection.co_id)} // 点击事件
                        >
                            <p>内容：{collection.co_txt}</p>
                            <p>创建时间：{formatDateTime(collection.co_created_at)}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Collect;
