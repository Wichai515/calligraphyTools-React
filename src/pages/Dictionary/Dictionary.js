//Dictionary.js

import React, { useState, useEffect } from 'react';  
import { Row, Col } from 'antd';  
import BookStylesTabs from "./components/BookStylesTabs";
import CharacterCard from "./components/CharacterCard";
import SearchInput from "./components/SearchInput";


// 模拟的字符数据  
const mockCharacters = [  
  {  
    id: 1,  
    character: '字测试',  
    imageUrl: 'http://43.143.114.225:7791/i/2024/03/08/65ea98498cb2c.png',  
    author: '张三',  
    inscriptionName: '测试'  
  }, 
  {  
    id: 2,  
    character: '字测试',  
    imageUrl: 'http://192.168.3.52:7791/i/2024/03/11/65ef15493c411.png',  
    author: '张三',  
    inscriptionName: '测试'  
  },  
  // 添加更多模拟数据...  
]; 

const Dictionary = () =>{

  const [searchQuery, setSearchQuery] = useState('');  
  const [characters, setCharacters] = useState([]);  

  const handleSearch = (query) => {  
    setSearchQuery(query);  
    // 使用模拟数据  
    setCharacters(mockCharacters.filter(char => char.character.includes(query)));  
  };  
  
  // const handleSearch = async (query) => {  
  //   setSearchQuery(query);  
  //   // 假设你有一个API可以获取字符数据，这里用fetch代替  
  //   const response = await fetch(`/api/characters?query=${query}`);  
  //   const data = await response.json();  
  //   setCharacters(data);  
  // };  

    return (
        <div>
          <SearchInput onSearch={handleSearch}/>
          <BookStylesTabs />

          <div style={{ marginTop: '20px' }}>  
            <Row gutter={16}> {/* 设置栅格间距 */}  
              {characters.map((character, index) => (  
                <Col span={4} key={index}> {/* 每个栅格占据8个单位，共24个单位一行 */}  
                  <CharacterCard  
                    key={character.id}  
                    imageUrl={character.imageUrl}  
                    character={character.character}  
                    author={character.author}  
                    inscriptionName={character.inscriptionName}  
                  />  
                </Col>  
              ))}  
            </Row>  
          </div> 

        </div>
    );
}

export default Dictionary