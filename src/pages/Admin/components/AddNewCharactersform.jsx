//AddNewCharactersform.jsx

import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col , notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;
const apiUrl = 'http://nas.wichaipan.cn';
const dynasties = ['先秦', '汉', '晋', '南北朝', '隋', '唐', '五代十国',
    '辽金', '宋', '元', '明', '清', '近代'];

const chtype = ['篆书', '隶书', '楷书', '行书', '草书', '魏碑',
    '篆刻', '简帛', '其他'];

const UploadNewCharactersForm = () => {
    const [form] = Form.useForm();
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(() => {
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
        fetchAuthors();
    }, []);


    const handleSubmit = async () => {
        console.log('Form values:', form.getFieldsValue());
        try {
            const formData = form.getFieldsValue();
            const requestBody = {
                book_name: formData.bookName,
                dynasty: formData.dynasty,
                type: formData.type,
                author_name: formData.author,
                characters: images.map(image => ({
                    character_sim: image.simplified,
                    character_com: image.traditional,
                    photo_url: image.url,
                    dictionary_number: image.dictionaryNumber
                }))
            };

            const response = await axios.post('http://43.143.114.225:8000/api/post-characters/', requestBody);
            console.log(response.data);

            notification.success({
                message: '上传成功',
                description: '您的单字已成功上传！',
            });
            
            // 清空图片状态
            setImages([]);

            form.resetFields();
        } catch (error) {
            console.error('Error submitting form:', error);
            notification.error({
                message: '上传失败',
                description: '上传失败，请检查您的输入！',
            });
        }
    };

    const handleAddImage = () => {
        setImages(prevImages => [...prevImages, { url: '', dictionaryNumber: '' }]);
    };

    const handleRemoveImage = index => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleImageUrlChange = (index, value) => {
        setImages(prevImages =>
            prevImages.map((img, i) => i === index ? { ...img, url: value } : img)
        );
    };

    const handleNumberChange = (index, value) => {
        setImages(prevImages =>
            prevImages.map((img, i) => i === index ? { ...img, dictionaryNumber: value } : img)
        );
    };

    const handleSimplifiedChange = (index, value) => {
        setImages(prevImages =>
            prevImages.map((img, i) => i === index ? { ...img, simplified: value } : img)
        );
    };

    const handleTraditionalChange = (index, value) => {
        setImages(prevImages =>
            prevImages.map((img, i) => i === index ? { ...img, traditional: value } : img)
        );
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>上传新单字</h1>
            <Form onFinish={handleSubmit} layout="vertical" form={form}>
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

                </Row>
                <Form.Item>
                    <Button type="primary" onClick={handleAddImage}>
                        添加图片
                    </Button>
                </Form.Item>
                {images.map((image, index) => (
                    <Row key={index} gutter={[16, 16]}>
                        <Col span={10}>
                            <Form.Item
                                label="图片URL"
                                rules={[{ required: true, message: '请输入图片URL' }]}
                            >
                                <Input
                                    value={image.url}
                                    onChange={e => handleImageUrlChange(index, e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="简体字"
                                rules={[{ required: true, message: '请输入简体字' }]}
                            >
                                <Input
                                    value={image.simplified}
                                    onChange={e => handleSimplifiedChange(index, e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="繁体字"
                                rules={[{ required: true, message: '请输入繁体字' }]}
                            >
                                <Input
                                    value={image.traditional}
                                    onChange={e => handleTraditionalChange(index, e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                label="序号"
                                rules={[{ required: true, message: '请输入序号' }]}
                            >
                                <Input
                                    value={image.dictionaryNumber}
                                    onChange={e => handleNumberChange(index, e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2} style={{ display: 'flex', alignItems: 'center' }}>
                            <Button type="danger" onClick={() => handleRemoveImage(index)}>
                                <DeleteOutlined />删除
                            </Button>
                        </Col>
                    </Row>
                ))}


                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UploadNewCharactersForm;
