//Dictionary.js

import React, { useState, useEffect } from 'react';
import BookStylesTabs from "./components/BookStylesTabs";
import SearchInput from "./components/SearchInput";
import axios from 'axios'; // 导入 Axios

function replaceLocalhost(url) {
  return url.replace('192.168.3.52:7791', 'nas.wichaipan.cn');
}

const Dictionary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fontType, setFontType] = useState('');
  const [characters, setCharacters] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // 发起后端请求
    console.log(query)
    console.log(fontType)
    axios.get(`http://43.143.114.225:8000/api/get-search-dictionary/${query}/${fontType}/`)
      .then(response => {
        // 处理获取到的数据
        console.log(response.data); // 可以在控制台查看后端返回的数据
        // 更新前端状态
        const updatecharacters = response.data.data.map(character => ({
          id: character.di_id,
          ch_sim: character.di_character_sim,
          ch_com: character.di_character_com,
          author: character.au_name,
          bookName: character.bo_name,
          dynasty: character.di_dynasty,
          imageurl: replaceLocalhost(character.di_photo_url),
        }))//添加字段
        setCharacters(updatecharacters);
        

        console.log('=====================');
        console.log(characters);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        // 处理错误情况
      });
  };

  useEffect(() => {
    // 监听书体类型和搜索词变化，并在变化时发起搜索请求  ----->解决异步问题
    if (searchQuery && fontType) {
      handleSearch(searchQuery);
    }
  }, [searchQuery, fontType]);

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <BookStylesTabs 
      setFontType={setFontType} 
      onClick={handleSearch} 
      characters={characters} 
      searchQuery={searchQuery}
      />
    </div>
  );
}

export default Dictionary;