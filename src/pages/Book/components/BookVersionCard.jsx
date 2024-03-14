//BookVersionCard.js
import { Link } from 'react-router-dom';
import { Card, Image } from 'antd';  
import { useNavigate } from 'react-router-dom';

const BookVersionCard = ({ version }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('点击了碑帖版本:', version.name);
        navigate(`/book/version/${version.id}`);
    };

    return (
        <Card
            title={version.name}
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={handleClick}
            hoverable
        >
            <Image 
            src={version.coverImageUrl} 
            alt={version.name} 
            width={200}
            preview={false} // 禁用图片预览效果
             />
        </Card>
    );
};

export default BookVersionCard;
