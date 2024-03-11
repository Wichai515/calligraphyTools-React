import { Input } from 'antd';  



const SearchInput = ({ onSearch }) => {  
  return (  
    <Input.Search  
      placeholder="输入要查询的碑帖"  
      enterButton  
      onSearch={onSearch} 
      allowClear
      style={{ marginBottom: '16px' }}
    />  
  );  
};

export default SearchInput