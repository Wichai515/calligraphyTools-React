import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Select, InputNumber, Row, Col} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate

const { Option } = Select;
const { TextArea } = Input;
const MAX_TEXT_LENGTH = 500;
const chtype = ['篆书', '隶书', '楷书', '行书', '草书', '魏碑', '篆刻', '简帛', '其他'];

const AddNewCollect = () => {
    const [visible, setVisible] = useState(false);
    const [textLength, setTextLength] = useState(0);
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]); // 用于存储选中的书法家
    const [columns, setColumns] = useState(4); // 设置列数，默认4
    const [form] = Form.useForm(); // 使用表单实例来处理表单重置
    const navigate = useNavigate(); // 获取 navigate 函数

    useEffect(() => {
        // 在组件加载时调用接口获取书法家列表
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://43.143.114.225:8000/api/get-authors/');
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchAuthors();
    }, []);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleTextChange = (e) => {
        const { value } = e.target;
        setTextLength(value.length);
        // 更新文本内容状态
        form.setFieldsValue({
            text: value
        });
    };

    const onFinish = async (values) => {
        // console.log('Form values:', values);
        try {
            const { title, type, columns } = values;
            const txt = values.text;
            const font = type;
            const calligraphers = selectedAuthors;
            const token = localStorage.getItem('token');

            const response = await axios.post('http://43.143.114.225:8000/api/post-collections/', {
                title,
                font,
                calligraphers,
                txt,
                columns,
                token
            });

            console.log('Submission response:', response.data);
            message.success('提交成功！');
            //跳转到集字详情页
            navigate(`/collectiondisplay/${response.data.co_id}`); // 使用 navigate 进行页面导航

            // 清空表单数据
            form.resetFields();
            setTextLength(0);
            setSelectedAuthors([]);
        } catch (error) {
            console.error('Error submitting data:', error);
            message.error('提交失败，请重试！');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('请输入必填字段');
    };

    const handleAuthorChange = (value) => {
        setSelectedAuthors(value); // 更新选中的书法家
    };

    const handleReset = () => {
        // 清空表单数据
        form.resetFields();
        setTextLength(0);
        setSelectedAuthors([]);
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
                    form={form} // 将表单实例绑定到Form组件
                    name="addCollectForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ title: '', text: '', type: '', columns: 4 }}
                >
                    <Form.Item
                        label="输入标题"
                        name="title"
                        rules={[{ required: true, message: '请输入标题' }]}
                    >
                        <Input placeholder="请输入集字标题" allowClear />
                    </Form.Item>
                    <Form.Item
                        label="文字内容"
                        name="text"
                        rules={[{ required: true, message: '请输入文字内容,至多500字' }]}
                    >
                        <TextArea
                            autoSize={{ minRows: 4, maxRows: 8 }}
                            maxLength={MAX_TEXT_LENGTH}
                            placeholder="请输入文字内容,至多500字"
                            onChange={handleTextChange}
                            allowClear
                            style={{ resize: 'vertical' }} // 设置允许垂直缩放
                        />
                        <span style={{ float: 'right', color: textLength > MAX_TEXT_LENGTH ? 'red' : 'inherit' }}>
                            {textLength}/{MAX_TEXT_LENGTH}
                        </span>
                    </Form.Item>
                    <Form.Item
                        name="author"
                        label="偏好书法家"
                        rules={[{ required: true, message: '请输入书法家名，若无明确，则填佚名!' }]}
                    >
                        <Select
                            mode="multiple" // 设置多选模式
                            placeholder="选择书法家,可多选，排序代表偏好程度"
                            onChange={handleAuthorChange}
                        >
                            {authors.map(author => (
                                <Option key={author.au_id} value={author.au_name}>{author.au_name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
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
                    <Form.Item
                        name="columns"
                        label="初始列数"
                        rules={[{ required: true, message: '请输入列数!' }]}
                    >
                        <InputNumber
                            min={1}
                            max={MAX_TEXT_LENGTH}
                            defaultValue={4}
                            onChange={value => setColumns(value)}
                        />
                    </Form.Item>

                    {/* 其他表单项 */}

                    <Form.Item>
                        <Row justify="center"> {/* 使用 Row 组件实现水平居中 */}
                            <Col>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Col>
                            <Col>
                                <Button type="default" onClick={handleReset} style={{ marginLeft: '8px' }}>
                                    重置
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AddNewCollect;
