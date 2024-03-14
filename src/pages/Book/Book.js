//Book.js
import React from 'react';  
import { Input, Row, Col, Card, Space } from 'antd';  
import SearchInput from './components/SearchInput';  
import BookCard from './components/BookCard';  
import { useState, useEffect } from 'react'; 
  
// 假设的碑帖数据  
// const books = [  
//   { id: 1, name: '碑帖A', description: '这是碑帖A的描述' , coverImageUrl: 'http://nas.wichaipan.cn/i/2024/03/14/65f2fdef0e0c5.png'},  
//   // ...更多碑帖数据  
// ];  

function replaceLocalhost(url) {
  return url.replace('192.168.3.52:7791', 'nas.wichaipan.cn');
}

  
const Book = () => {  

  const [books, setBooks] = useState([]); // 用于存储书籍数据的状态

  useEffect(() => {
    // 在组件加载时获取书籍数据
    fetch('http://43.143.114.225:8000/api/get-books')
      .then(response => response.json())
      .then(data => {
        // 将获取的书籍数据设置为组件的状态
        const updatedBooks = data.data.map(book => ({
          id: book.bo_id,
          name: book.bo_name,
          description: book.bo_introduce,
          coverImageUrl: replaceLocalhost(book.bo_cover_url)
        }));
        setBooks(updatedBooks);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []); // 空数组作为依赖，确保只在组件加载时获取一次数据

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
          <Col key={book.id} span={6}>  
            <BookCard book={book} />  
          </Col>  
        ))}  
      </Row>  
    </div>  
  );  
};  
  
export default Book;