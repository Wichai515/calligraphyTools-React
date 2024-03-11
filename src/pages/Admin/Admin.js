import React, { useState } from 'react';
import {
  UserOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import MyFooter from '../components/MyFooter/MyFooter';

const { Header, Content,  Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('上传', '10', <UploadOutlined />,[
    getItem('上传新碑帖', '11',<Link to="/admin/uploadnewbooks" />),
    getItem('上传已有碑帖', '12',<Link to="/admin/uploadexisitngbooks" />),
  ]),
  getItem('单字裁切上传','13',<Link to="/admin/Singlecut" />)
];

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >

          <div
            style={{
              padding: 24,
              minHeight: 600,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            
            <Outlet />
          </div>
        </Content>
        <MyFooter />
      </Layout>
    </Layout>
  );
};


export default Admin;