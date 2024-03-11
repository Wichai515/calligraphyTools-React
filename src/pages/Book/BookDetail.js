// BookDetail.jsx  

import React, { useEffect, useState } from 'react';
import { Card, Image, Row, Col } from 'antd';
import axios from 'axios'; // 假设你使用axios作为HTTP客户端  
import { Link } from 'react-router-dom';
import BookVersionCard from './components/BookVersionCard';

// const BookDetail = ({ match }) => {  
//   const [book, setBook] = useState(null);  

//   useEffect(() => {  
//     const bookId = match.params.id; // 从路由参数中获取碑帖ID  
//     axios.get(`/api/books/${bookId}`) // 假设你的后端API是这个格式  
//       .then(response => {  
//         setBook(response.data);  
//       })  
//       .catch(error => {  
//         console.error('Error fetching book details:', error);  
//       });  
//   }, [match.params.id]); // 当路由参数变化时重新请求数据  

//   if (!book) {  
//     return <div>Loading...</div>; // 在数据加载时显示加载中状态  
//   }  

//   return (  
//     <Card title={book.name}>  
//       <Image src={book.coverImageUrl} alt={book.name} width={200} />  
//       <p>{book.description}</p>  
//       {/* 其他碑帖详情信息 */}  
//     </Card>  
//   );  
// };  

// export default BookDetail;

// 模拟的碑帖版本数据  
const mockBookVersions = [
    {
        id: 'version1',
        name: '碑帖版本1',
        coverImageUrl: 'https://example.com/cover1.jpg',
        description: '这是碑帖版本1的描述...',
        // ... 其他版本信息  
    },
    {
        id: 'version2',
        name: '碑帖版本2',
        coverImageUrl: 'https://example.com/cover2.jpg',
        description: '这是碑帖版本2的描述...',
        // ... 其他版本信息  
    },
    // ... 添加更多版本数据  
];

const BookDetail = () => {
    return (
        <div>
            <Row gutter={[16, 16]}>

            </Row>
            {mockBookVersions.map((version) => (
                <Col>
                    <BookVersionCard key={version.id} version={version} />
                </Col>
            ))}
        </div>
    );
}

export default BookDetail;
