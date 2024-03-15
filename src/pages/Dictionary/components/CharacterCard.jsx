import { Card,Image } from 'antd';  

  
const CharacterCard = ({ character }) => {  
  return (  
    <Card 
    // title={character.ch_sim} 
    style={{ textAlign: 'center', cursor: 'pointer' }} // 使用style属性设置居中显示和光标样式
    hoverable
    >  
      <Image 
      src={character.imageurl} 
      alt={character.ch_sim}
      style={{ width: '100%', height: 'auto' }}
        />  
      <p>{character.dynasty} {character.bookName} {character.author}</p>  
    </Card>  
  );  
};  

export default CharacterCard 