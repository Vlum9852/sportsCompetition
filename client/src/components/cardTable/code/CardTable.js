import { useDispatch, useSelector } from 'react-redux';
import '../styles/cardTable.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { setCurrentCard } from '../../../stateManager/currentCard/currentCardSlice';
import { TEAMS } from '../../../config/config';


export default function CardTable({pData}) {
    
    const [stRows, setRows] = useState();
    const rfIndex = useRef(0);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(setCurrentCard(-1));
        let tempData = [];
        let rows = [];
        for (let i = 0; i < pData.length; i++) {
            tempData.push(pData[i]);
            if ((i + 1) % 6 == 0) {                
                rows.push(<CardTableRow pData={tempData} pIndex={rfIndex}/>);
                tempData = [];
            }
            
        }
        rows.push(<CardTableRow pData={tempData} pIndex={rfIndex} />);
        setRows(rows);
        
    }, [pData]);

    return (
        <div className='card-table'> 
            {stRows}
        </div>
    );

}

function CardTableRow({pData, pIndex, pSetIndex}) {
    const currentSection = useSelector((state) => state.currentSection.value);
    const [stItems, setItems] = useState()
    const nameKey = (section) => {
        switch (section) {
            case TEAMS: return "name";
        }
    }
    useLayoutEffect(() => {
        let index = pIndex.current;
        let items = pData.map((item) => <CardTableItem pData={item[nameKey(currentSection)]} pIndex={index++} />);
        pIndex.current = index;
        setItems(items);
    }, [pData]);

    return (
        <div className='card-table-row'> 
            {stItems}
        </div>
    );
}

function CardTableItem({pData, pIndex}) {
    const [stActive, setActive] = useState(false);
    const currentCard = useSelector((state) => state.currentCard.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentCard != pIndex) setActive(false);
    }, [currentCard]);

    return (
        <div 
            className={stActive ? 'card-table-item-active' : 'card-table-item'}
            onClick={() => {
                if (stActive) {
                    dispatch(setCurrentCard(-1));
                }
                else {
                    dispatch(setCurrentCard(pIndex));
                }
                setActive(!stActive);
            }}
        > 
        <div className='card-table-item-image'></div>
        <div className='card-table-item-text'>{pData}</div>
        </div>
    );
}