import { Card,Image } from 'antd';  

  
const CharacterCard = ({ imageUrl, character, author, inscriptionName }) => {  
  return (  
    <Card title={character} hoverable>  
      <Image src={imageUrl} alt={character} style={{ width: '100%', height: 'auto' }} />  
      <p>作者：{author}</p>  
      <p>碑帖名：{inscriptionName}</p>  
    </Card>  
  );  
};  

export default CharacterCard