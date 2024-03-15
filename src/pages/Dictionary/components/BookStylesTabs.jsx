import { Tabs, Row, Col } from 'antd';
import CharacterCard from "./CharacterCard";

const { TabPane } = Tabs;
const chtype = [
  '篆书',
  '隶书',
  '楷书',
  '行书',
  '草书',
  '魏碑',
  '篆刻',
  '简帛',
  '其他'
];


const BookStylesTabs = ({ setFontType, characters, onClick, searchQuery }) => {
  const handleTabChange = (key) => {
    // key 就是所选的书体类型
    console.log(key);
    setFontType(key); // 将所选的书体类型传递给父组件
    onClick(searchQuery); // 调用父组件传递过来的搜索函数来更新搜索结果
  };
  

  return (
    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
      {chtype.map((type) => (
        <TabPane tab={type} key={type}>
          {/* {type} */}
          <div style={{ marginTop: '20px' }}>
            <Row gutter={16}>
              {characters.map((character, index) => (
                <Col span={6} key={index}>
                  <CharacterCard character={character}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </TabPane>
      ))}
    </Tabs>
  );
};


export default BookStylesTabs;