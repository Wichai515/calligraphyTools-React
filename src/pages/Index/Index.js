import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

const items = [
  { key: '1', label: '首页', path: '/' },
  { key: '2', label: '字典', path: '/dictionary' },
  { key: '3', label: '碑帖', path: '/book' },
  { key: '4', label: '集字', path: '/collect' },
  { key: '5', label: '识字' },
  { key: '6', label: '我的' },
];

const Index = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
          defaultSelectedKeys={['1']}
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
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        CalligraphyTools ©{new Date().getFullYear()} Created by Wichai_pan | Graduation Project
      </Footer>
    </Layout>
  );
};

export default Index;
