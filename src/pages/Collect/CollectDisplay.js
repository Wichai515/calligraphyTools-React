//测试页面

import React, { useState } from 'react';
import { Card, Select } from 'antd';

const { Option } = Select;

const CollectDisplay = () => {
    const [numCols, setNumCols] = useState(3); // 默认列数为3

    const handleSelectChange = value => {
        setNumCols(value);
    };

    // 模拟的卡片数据
    const cardData = [
        { id: 1, imageUrl: 'http://192.168.3.52:7791/i/2024/03/15/65f427f0eaef4.png' },
        { id: 2, imageUrl: 'http://192.168.3.52:7791/i/2024/03/14/65f2e061bb67f.png' },
        { id: 3, imageUrl: 'http://192.168.3.52:7791/i/2024/03/14/65f2e061bb67f.png' },
        { id: 4, imageUrl: 'http://192.168.3.52:7791/i/2024/03/15/65f427f0eaef4.png' },
        { id: 5, imageUrl: 'http://192.168.3.52:7791/i/2024/03/14/65f2e061bb67f.png' },
        { id: 6, imageUrl: 'http://192.168.3.52:7791/i/2024/03/14/65f2e061bb67f.png' },
        { id: 7, imageUrl: 'http://192.168.3.52:7791/i/2024/03/14/65f2e061bb67f.png' },
        // 添加更多卡片数据...
    ];

    // 重新排列卡片的函数
    const rearrangeCards = (data, cols) => {
        const numRows = Math.ceil(data.length / cols);
        const rearranged = Array(numRows)
            .fill()
            .map(() => Array(cols).fill(null));

        let counter = 0;
        for (let j = cols - 1; j >= 0; j--) {
            for (let i = 0; i < numRows; i++) {
                if (counter < data.length) {
                    rearranged[i][j] = data[counter++];
                }
            }
        }
        return rearranged;
    };

    // 调用函数重新排列卡片
    const rearrangedCardData = rearrangeCards(cardData, numCols);

    return (
        <div>
            <Select defaultValue={numCols} onChange={handleSelectChange}>
                {[...Array(cardData.length).keys()].map(i => (
                    <Option key={i + 1} value={i + 1}>{i + 1} 列</Option>
                ))}
            </Select>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 200px)`, gap: '8px', justifyContent: 'flex-end' }}>
                {rearrangedCardData.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {row.map((card, colIndex) => (
                            <Card key={colIndex}  style={{ width: 200, height: 200, margin: 8 }}>
                                {card && (
                                    <>
                                        <div style={{ textAlign: 'center' }}>{card.id}</div>
                                        <img src={card.imageUrl} alt={`Image ${card.id}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </>
                                )}
                            </Card>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default CollectDisplay;
