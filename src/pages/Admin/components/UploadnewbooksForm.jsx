import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Upload, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const apiUrl = 'http://nas.wichaipan.cn';
// 100.115.73.6   43.143.114.225:7791  nas.wichaipan.cn

const dynasties = [
    '先秦',
    '汉',
    '晋',
    '南北朝',
    '隋',
    '唐',
    '五代十国',
    '辽金',
    '宋',
    '元',
    '明',
    '清',
    '近代'
];

const chtype = [
    '篆书',
    '隶书',
    '楷书',
    '行书',
    '草书',
    '魏碑',
    '篆刻',
    '简帛',
    '其他'
];


const UploadnewbooksForm = () => {
    const [form] = Form.useForm();
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [token, setToken] = useState(''); // 用于保存 token

    useEffect(() => {
        // 在组件加载时调用接口获取书法家列表
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://43.143.114.225:8000/api/get-authors/');
                const data = await response.json();
                setAuthors(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        const fetchToken = async () => {
            try {
                const token = await getToken(apiUrl, 'wichai_pan@outlook.com', 'wichai0515');
                console.log('Token:', token);
                setToken(token);
            } catch (error) {
                console.error('Error getting token:', error);
            }
        };

        fetchAuthors();
        fetchToken();
    }, []);

    async function getToken(apiUrl, email, password) {
        const url = `${apiUrl}/api/v1/tokens`;
        const requestBody = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            if (data.status) {
                return data.data.token;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw new Error('Failed to get token: ' + error.message);
        }
    }
    const props = {
        action: `${apiUrl}/api/v1/upload`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'X-Requested-Width': null
        },
    }
    const uploadImageToImageHost = async (file) => {
        // 在这里实现图片上传兰空图床逻辑
        try {
            const url = `${apiUrl}/api/v1/upload`;
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                },
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                return data.links.url;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image: ' + error.message);
        }

    };

    const handleImageUpload = async (file) => {
        console.log(file)
        const imageUrl = await uploadImageToImageHost(file);
        setImages(prevImages => [...prevImages, { url: imageUrl, page: 1 }]);
    };

    const handlePageChange = (index, page) => {
        setImages(prevImages =>
            prevImages.map((img, i) => i === index ? { ...img, page } : img)
        );
    };

    const handleFormChange = (changedValues, allValues) => {
        // 处理表单值变化逻辑
    };

    const handleSubmit = () => {
        console.log('Form values:', form.getFieldsValue());
        // 在这里处理表单提交逻辑，比如发送到服务器  
    };

    // const beforeUpload = (file) => {
    //     // 在这里添加文件上传前的验证逻辑
    // };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>上传新碑帖</h1>
            <Form onFinish={handleSubmit} layout="vertical" form={form} onValuesChange={handleFormChange}>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Form.Item
                            name="bookName"
                            label="碑帖名称"
                            rules={[{ required: true, message: '请输入碑帖名!' }]}
                        >
                            <Input placeholder="输入碑帖名称" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="author"
                            label="书法家"
                            rules={[{ required: true, message: '请输入书法家名，若无明确，则填佚名!' }]}
                        >
                            <Select placeholder="选择书法家">
                                {authors.map(author => (
                                    <Option key={author.au_id} value={author.au_name}>{author.au_name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="dynasty"
                            label="朝代"
                            rules={[{ required: true, message: '请选择朝代，若不明确，请填!' }]}
                        >
                            <Select placeholder="选择朝代">
                                {dynasties.map((dynasty, index) => (
                                    <Option key={index} value={dynasty}>{dynasty}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="type"
                            label="书体类型"
                            rules={[{ required: true, message: '请选择书体类型!' }]}
                        >
                            <Select placeholder="选择书体类型">
                                {chtype.map((type, index) => (
                                    <Option key={index} value={type}>{type}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="introduction"
                            label="碑帖简介"
                            rules={[{ required: true, message: '请输入碑帖简介!' }]}
                        >
                            <TextArea placeholder="输入碑帖简介" allowClear style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="version"
                            label="碑帖版本"
                            rules={[{ required: true, message: '请输入碑帖版本!' }]}
                        >
                            <Input placeholder="输入碑帖版本" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label="上传图片"
                    extra="支持上传多张图片"
                >
                    <Upload
                        {...props}
                        listType="picture-card"
                    >
                        <PlusOutlined />
                    </Upload>
                </Form.Item>
                {images.map((image, index) => (
                    <Row key={index} gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item label="图片URL">
                                <Input value={image.url} disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="页码">
                                <Input
                                    value={image.page}
                                    onChange={(e) => handlePageChange(index, e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                ))}
                {/* 其他表单项 */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UploadnewbooksForm;
