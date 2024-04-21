import React, { useState } from 'react';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Recognition.css'; // 导入样式文件

const Recognition = () => {
    const [fontStyles, setFontStyles] = useState([]); // 用于存储返回的字体数据数组

    const handleUpload = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // 从响应中获取返回的字体数据
            const { predicted_font } = info.file.response;
            setFontStyles(prevFontStyles => [...prevFontStyles, predicted_font]); // 添加新的字体数据到数组中
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const props = {
        name: 'image',
        action: 'http://43.143.114.225:8000/api/post-predict-font-style/',
        headers: {
            authorization: 'authorization-text',
        },
        onChange: handleUpload,
    };

    return (
        <div className="recognition-container"> {/* 使用外部样式容器 */}
            <div className="upload-wrapper"> {/* 添加包裹容器 */}
                <Upload 
                    {...props}
                    listType="picture-card"
                >
                    <div>
                        <UploadOutlined style={{ fontSize: '24px' }} />
                        <div style={{ marginTop: '8px' }}>点击上传图片识别书体</div>
                    </div>
                </Upload>
            </div>
            {/* 在页面上显示返回的字体数据 */}
            {fontStyles.map((fontStyle, index) => (
                <div key={index} className="font-style">识别书体 {index + 1}: {fontStyle}</div>
            ))}
        </div>
    );
};

export default Recognition;
