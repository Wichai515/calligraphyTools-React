//Uploadnewbooks.js

import React, { Component } from 'react';  
import { Form, Input, Select, Button, Upload, Row, Col  } from 'antd';  

import { PlusOutlined,UploadOutlined } from '@ant-design/icons';  

const { Option } = Select;  
const { TextArea } = Input;
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
const chtype =[
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


class Uploadnewbooks extends Component {  
    handleSubmit = (values) => {  
        console.log('Form values:', values);  
        // 在这里处理表单提交逻辑，比如发送到服务器  
    };  
  
    beforeUpload = (file) => {  
        // 在这里添加文件上传前的验证逻辑  
        const isJPG = file.type === 'image/jpeg';  
        if (!isJPG) {  
            console.log('You can only upload JPG file!');  
            return false;  
        }  
        const isLt2M = file.size / 1024 / 1024 < 2;  
        if (!isLt2M) {  
            console.log('Image must be smaller than 2MB!');  
            return false;  
        }  
        return true;  
    };  


    render() {
        return (
            <div>  
                <h1 style={{textAlign:'center'}}>上传新碑帖</h1>  
                <Form onFinish={this.handleSubmit} layout="vertical">  
                    <Row gutter={[16, 16]}>  
                        <Col span={6}>  
                            <Form.Item  
                                name="bookName"  
                                label="碑帖名称"  
                                rules={[{ required: true, message: '请输入碑帖名!' }]}  
                            >  
                                <Input placeholder="输入碑帖名称" style={{ width: '100%' }}/>  
                            </Form.Item>  
                        </Col>  
                        <Col span={6}>  
                            <Form.Item  
                                name="author"  
                                label="书法家"  
                                rules={[{ required: true, message: '请输入书法家名，若无明确，则填佚名!' }]}  
                            >  
                                <Select placeholder="选择书法家">  
                                    <Option value="jack">Jack</Option>  
                                    <Option value="lucy">Lucy</Option>  
                                    {/* More options here */}  
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
                                <TextArea  placeholder="输入碑帖简介" allowClear style={{ width: '100%' }}/>  
                            </Form.Item>  
                        </Col>
                        <Col span={6}>  
                            <Form.Item  
                                name="version"  
                                label="碑帖版本"  
                                rules={[{ required: true, message: '请输入碑帖版本!' }]}  
                            >  
                                <Input placeholder="输入碑帖版本" style={{ width: '100%' }}/>  
                            </Form.Item>  
                        </Col>
                    </Row>  
                    <Form.Item  
                        name="upload1"  
                        label="上传1"  
                        rules={[{ required: true, message: '请上传文件！' }]}  
                    >  
                        <Upload>
                        {/* <Upload name="file" beforeUpload={beforeUpload} showUploadList={false}>   */}
                        <Button icon={<UploadOutlined />}>点击上传</Button>  
                        </Upload>  
                    </Form.Item>  
                    {/* Add more form items here using Row and Col to layout them */}  
  
                    <Form.Item>  
                        <Button type="primary" htmlType="submit" block>  
                            提交  
                        </Button>  
                    </Form.Item>  
                </Form>  
            </div>  
        );
    }
}

export default Uploadnewbooks;