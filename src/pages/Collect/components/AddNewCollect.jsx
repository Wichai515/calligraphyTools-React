import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
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
            <div
                style={{
                    width: '96px',
                    height: '96px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px dashed #d9d9d9',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    marginBottom: '16px', // 调整按钮与其他元素的间距
                }}
                onClick={showModal} // 点击按钮显示对话框
            >
                <PlusOutlined style={{ fontSize: '32px', marginBottom: '8px' }} />
                <div>创建新集字</div>
            </div>
            <Modal
                title="创建新集字"
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
