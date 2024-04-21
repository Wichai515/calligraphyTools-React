//index.js

import React , { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, Button, theme } from 'antd';
import MyFooter from '../components/MyFooter/MyFooter';

const { Header, Content, Footer } = Layout;

const items = [
  { key: '1', label: '首页', path: '/' },
  { key: '2', label: '字典', path: '/dictionary' },
  { key: '3', label: '碑帖', path: '/book' },
  { key: '4', label: '集字', path: '/collect' },
  { key: '5', label: '识字', path: '/regonition'},
  { key: '6', label: '我的' },
  { key: '7', label: '管理员', path: '/admin' },
];

const Index = () => {
  const token = localStorage.getItem('token'); // 获取 token

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token'); // 移除 token
    // 执行其他注销操作，刷新
    window.location.reload(); // 刷新页面
  };

  // 在组件加载时检查本地存储中是否有已选择的菜单项键
  const [selectedMenuItem, setSelectedMenuItem] = useState(() => {
    const storedKey = localStorage.getItem('selectedMenuItem');
    return storedKey ? [storedKey] : ['1']; // 设置默认选中项为首页
  });

  // 当菜单项被点击时更新本地存储的值
  const handleMenuItemClick = item => {
    setSelectedMenuItem([item.key]);
    localStorage.setItem('selectedMenuItem', item.key);
  };

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedMenuItem}
          onSelect={handleMenuItemClick}
          // defaultSelectedKeys={['1']}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {items.map(item => (
            <Menu.Item key={item.key}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        {token ? (
          <Button type="primary" onClick={handleLogout}>登出</Button>
        ) : (
          <Link to="/login"><Button type="primary">登录/注册</Button></Link>
        )}

      </Header>
      <Content
        style={{
          padding: '32px 32px',
        }}
      >

        <div
          style={{
            background: colorBgContainer,
            minHeight: 550,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* 二级路由出口 详情页 */}
          <Outlet />
        </div>
      </Content>
      <MyFooter />
    </Layout>
  );
};

export default Index;
