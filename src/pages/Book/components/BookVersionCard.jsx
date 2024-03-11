//BookVersionCard.js
import { Card, Image } from 'antd';  
import { Link } from 'react-router-dom';

const BookVersionCard = ({ version }) => {
    return (
        <Card title={version.name} hoverable>
            <Image src={version.coverImageUrl} alt={version.name} width={200} />
            <Link to={`/book/verion/${version.id}`}>查看详情</Link>
            {/*这个地方要携带好几个数据，这个url怎么写比较好 */}
        </Card>
    );
}

export default BookVersionCard 