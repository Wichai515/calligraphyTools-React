import { Input } from 'antd';  



const SearchInput = ({ onSearch }) => {  
  return (  
    <Input.Search  
      placeholder="输入要查询的汉字"  
      enterButton  
      onSearch={onSearch}  
    />  
  );  
};

export default SearchInput