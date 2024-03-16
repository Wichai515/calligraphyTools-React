//AddNewCollect.jsx
import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddNewCollect = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values) => {
        console.log('Received values:', values);
        // 在这里处理用户提交的数据
        setVisible(false); // 关闭 Modal
    };

    return (
        <>
            <Button icon={<PlusOutlined />} size="large" onClick={showModal}>
                添加新卡片
            </Button>
            <Modal
                title="添加新卡片"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="addCollectForm"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="文字内容"
                        name="text"
                        rules={[{ required: true, message: '请输入文字内容' }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* 其他表单项 */}
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AddNewCollect;


