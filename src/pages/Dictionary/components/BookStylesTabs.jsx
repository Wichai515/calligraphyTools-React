import { Tabs } from 'antd';  
  
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
  
const BookStylesTabs = () => {  
  return (  
    <Tabs defaultActiveKey="1">  
      {chtype.map((type) => (  
        <TabPane tab={type} key={type}>  
          {/* 这里可以放置每个书体对应的内容 */}  
          {type} {/* 例如，显示书体的名称作为默认内容 */}  
        </TabPane>  
      ))}  
    </Tabs>  
  );  
};  
  
export default BookStylesTabs;