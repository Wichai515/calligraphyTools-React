import React from 'react';
import { Card } from 'antd';

const Test = () => {
  // 假设您知道图片在文件系统中的路径
  //const imagePath1 = '/cos/photo/钟繇/1.tif';
  //const imagePath2 = '/cos/photo/钟繇/图片2.tif';<Tiff src={imagePath1} alt="照片1" />
  const imagePath1 = './1.png';

  return (
    <div>
      <img src={imagePath1}></img>
     
    </div>
  );
};

export default Test;
