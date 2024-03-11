import React from 'react';  
import { Input, Row, Col, Card, Space } from 'antd';  
import SearchInput from './components/SearchInput';  
import BookCard from './components/BookCard';  
  
// 假设的碑帖数据  
const books = [  
  { id: 1, name: '碑帖A', description: '这是碑帖A的描述' , coverImageUrl: 'http://43.143.114.225:7791/i/2024/03/08/65ea98498cb2c.png'},  
  { id: 2, name: '碑帖B', description: '这是碑帖B的描述' , coverImageUrl: 'http://43.143.114.225:7791/i/2024/03/08/65ea98498cb2c.png'},
  { id: 2, name: '碑帖B', description: '这是碑帖B的描述' , coverImageUrl: 'http://43.143.114.225:7791/i/2024/03/08/65ea98498cb2c.png'},  
  { id: 2, name: '碑帖B', description: '这是碑帖B的描述' , coverImageUrl: 'http://43.143.114.225:7791/i/2024/03/08/65ea98498cb2c.png'},
  { id: 2, name: '碑帖B', description: '这是碑帖B的描述' , coverImageUrl: 'http://43.143.114.225:7791/i/2024/03/08/65ea98498cb2c.png'},
  // ...更多碑帖数据  
];  
  
const Book = () => {  
  const handleSearch = (value) => {  
    // 在这里实现搜索逻辑，例如过滤books数组  
    console.log('搜索:', value);  
  };  
  
  return (  
    <div className="app-container">  
      {/* 搜索框 */}  
      <SearchInput onSearch={handleSearch} />  
      {/* 使用Space组件在SearchInput和栅格布局之间添加间距 */}  
      <Space size="middle" />  
      {/* 栅格和卡片 */}  
      <Row gutter={[16, 16]}>  
        {books.map((book) => (  
          <Col key={book.id} span={8}>  
            <BookCard book={book} />  
          </Col>  
        ))}  
      </Row>  
    </div>  
  );  
};  
  
export default Book;