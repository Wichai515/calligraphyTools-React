import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import MyFooter from '../components/MyFooter/MyFooter';


const Test = () => {
  // 假设您知道图片在文件系统中的路径
  
  const imagePath1 = 'http://43.143.114.225:7791/i/2024/03/07/65e94091be479.jpg';
  const imagePath2 = 'http://43.143.114.225:7791/i/2024/03/07/65e946c805043.png';
  const navigate = useNavigate()

  return (
    <div>
      test
      <button onClick={() => navigate('/')}>jump</button>
      
      <MyFooter />
    </div>
  );
};

export default Test;
