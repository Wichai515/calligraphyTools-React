// MyFooter.js
import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const MyFooter = () => (
  <Footer
    style={{
      textAlign: 'center',
    }}
  >
    CalligraphyTools ©{new Date().getFullYear()} Created by Wichai_pan | Graduation Project
  </Footer>
);

export default MyFooter;
