import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

const Collect = () => {
    const navigate = useNavigate();
    const promptShown = useRef(false);

    useEffect(() => {
        // 在组件加载时检查是否有 token
        const token = localStorage.getItem('token');
        // console.log(token);
        // 如果没有 token 且尚未显示提示框，则弹出提示框
        if (!token && !promptShown.current) {
            promptShown.current = true; // 标记已显示提示框
            Modal.confirm({
                title: '需要登录',
                content: '您需要登录才能继续使用集字功能，是否前往登录页面？',
                okText: '去登录',
                cancelText: '取消',
                onOk() {
                    navigate('/login');
                },
                onCancel() {
                    // 取消操作，直接跳转到首页或其他页面
                    navigate('/'); 
                    // 更新本地存储的值
                    localStorage.setItem('selectedMenuItem', '1');
                    window.location.reload(); // 刷新页面
                },
            });
        }
    }, [navigate]);

    return (
        <div>
            Collect
        </div>
    );
}

export default Collect;
