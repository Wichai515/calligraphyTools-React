import React, { useState, useEffect } from 'react';
import { Card, Select , Image} from 'antd';
import axios from 'axios'; // 引入 Axios 库
import { useParams } from 'react-router-dom';

const { Option } = Select;

function replaceLocalhost(url) {
    return url.replace('192.168.3.52:7791', 'nas.wichaipan.cn');
}

const CollectionDisplay = () => {
    const { coid } = useParams();
    const [numCols, setNumCols] = useState(3);
    const [collectionDetails, setCollectionDetails] = useState(null);
    const [cardData, setCardData] = useState([]);
    const token = localStorage.getItem('token');
    const [maxColumns, setMaxColumns] = useState(3); // 最大列数，默认为3

    useEffect(() => {
        axios.get(`http://43.143.114.225:8000/api/get-collection-details/${token}/${coid}/`)
            .then(response => {
                setCollectionDetails(response.data);
                const { co_setting } = response.data;
                const fetchData = async () => {
                    try {
                        const cards = await Promise.all(
                            co_setting.choose_di.map(async ({ dictionary_id }) => {
                                const response = await axios.get(`http://43.143.114.225:8000/api/get-DicCharacter/${dictionary_id}/`);
                                // console.log('response data', response.data);
                                // console.log('=====================================');
                                // console.log('au_name', response.data.au.au_name);
                                // console.log('bo_name', response.data.bo.bo_name);
                                // console.log('di_id', response.data.di_id);
                                // console.log('di_dynasty', response.data.di_dynasty);
                                // console.log('di_character_sim', response.data.di_character_sim);
                                // console.log('di_character_com', response.data.di_character_com);
                                
                                return {
                                    id: dictionary_id,
                                    di_id: response.data.di_id,
                                    imageUrl: replaceLocalhost(response.data.di_photo_url),
                                    au_name: response.data.au.au_name,
                                    bo_name: response.data.bo.bo_name,
                                    di_dynasty: response.data.di_dynasty,
                                    di_character_sim: response.data.di_character_sim,
                                    di_character_com: response.data.di_character_com,
                                };
                            })
                        );
                        // console.log('columns', response.data.co_setting.choose_di[0].co_ch);
                        // console.log('columns', response.data.co_setting.columns);
                        const maxColumns = response.data.co_setting.choose_di.length;
                        setMaxColumns(maxColumns);
                        const defaultColumns = response.data.co_setting.columns;
                        // const defaultColumns = Math.min(response.data.co_setting.columns, maxColumns, 3);
                        setCardData(cards.filter(card => card !== null));
                        setNumCols(defaultColumns);
                    } catch (error) {
                        console.error('Error fetching card data:', error);
                    }
                };
                fetchData();
            })
            .catch(error => {
                console.error('Error fetching collection details:', error);
            });
    }, [coid, token]);

    const handleSelectChange = value => {
        setNumCols(value);
    };

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

    const renderCards = () => {
        const rearrangedCardData = rearrangeCards(cardData, numCols);
        // console.log(cardData);
        return (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 200px)`, gap: '8px', justifyContent: 'flex-end' }}>
                {rearrangedCardData.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {row.map((card, colIndex) => (
                            <Card 
                                key={colIndex}
                                bordered={false}
                                style={{ 
                                    margin: 1, 
                                    textAlign: 'center', 
                                    cursor: 'pointer',
                                    padding: 0 // 调整内容和边框之间的距离
                                }}>
                                {card && (
                                    <>
                                        <Image 
                                        src={card.imageUrl} 
                                        alt={`Image ${card.di_character_sim}`} 
                                        title={card.di_character_sim}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                        <p style={{ textAlign: 'center'}} >{card.di_character_sim}</p>
                                        <p style={{ textAlign: 'center'}} >{card.di_dynasty}  {card.au_name } {card.bo_name} </p>
                    
                                    </>
                                )}
                            </Card>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    return (
        <div>
            {collectionDetails && (
                <Select value={numCols} onChange={handleSelectChange}>
                    {[...Array(maxColumns).keys()].map(i => (
                        <Option key={i + 1} value={i + 1}>{i + 1} 列</Option>
                    ))}
                </Select>
            )}
            {renderCards()}
        </div>
    );
};

export default CollectionDisplay;
