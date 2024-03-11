import React from 'react';  
import { Card, Image } from 'antd'; // 导入Image组件  
import { useNavigate } from 'react-router-dom';
  
const BookCard = ({ book }) => {  
    const navigate = useNavigate();  

    const handleClick = () => {  
        console.log('点击了碑帖:', book.name)
        navigate(`/book/detail/${book.id}`); // 导航到详情页，并传递碑帖ID作为参数  
    };  

  return (  
    <Card  
      title={book.name}  
      cover={<Image src={book.coverImageUrl} alt={book.name} width={200} />} // 使用cover属性添加封面图  
      onClick={handleClick}  
    >  
      <p>{book.description}</p>  
    </Card>  
  );  
};  
  
export default BookCard; // 使用withRouter包装组件以注入路由功能