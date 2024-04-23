import React, { useState } from 'react';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Recognition.css'; // 导入样式文件

const Recognition = () => {
    const [fontStyles, setFontStyles] = useState([]); // 用于存储返回的字体数据数组
    const [ReCharacters, setReCharacters] = useState([]); // 用于存储返回的字体数据数组

    const handleUploadFont = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // 从响应中获取返回的字体数据
            const { predicted_font } = info.file.response;
            setFontStyles(prevFontStyles => [...prevFontStyles, predicted_font]); // 添加新的字体数据到数组中
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const props1 = {
        name: 'image',
        action: 'http://43.143.114.225:8000/api/post-predict-font-style/',
        headers: {
            authorization: 'authorization-text',
        },
        onChange: handleUploadFont,
    };

    const handleUploadCharacher = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // 从响应中获取返回的字体数据
            const { predict_calligraphy } = info.file.response;
            setReCharacters(prevCharachers => [...prevCharachers, predict_calligraphy]); // 添加新的字体数据到数组中
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const props2 = {
        name: 'image',
        action: 'http://43.143.114.225:8000/api/post-predict-character/',
        headers: {
            authorization: 'authorization-text',
        },
        onChange: handleUploadCharacher,
    };

    return (
        <div className="recognition-container"> {/* 使用外部样式容器 */}
            <div className="upload-wrapper"> {/* 添加包裹容器 */}
                <Upload 
                    {...props1}
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

            <div className="upload-wrapper"> {/* 添加包裹容器 */}
                <Upload 
                    {...props2}
                    listType="picture-card"
                >
                    <div>
                        <UploadOutlined style={{ fontSize: '24px' }} />
                        <div style={{ marginTop: '8px' }}>点击上传图片识别书法字</div>
                    </div>
                </Upload>
            </div>
            {/* 在页面上显示返回的字体数据 */}
            {ReCharacters.map((ReCharacter, index) => (
                <div key={index} className="font-style">识别书法字 {index + 1}: {ReCharacter}</div>
            ))}
        </div>
    );
};

export default Recognition;
