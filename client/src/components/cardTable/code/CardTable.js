import { useDispatch, useSelector } from 'react-redux';
import '../styles/cardTable.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { setCurrentCard } from '../../../stateManager/currentCard/currentCardSlice';
import { SEASONS, TEAMS } from '../../../config/config';
import { setModalContent } from '../../../stateManager/modalWindowContent/modalWindowContentSlice';
import { setVisibleModal } from '../../../stateManager/isVisibleModalWindow/isVisibleModalWindowSlice';
import ListTeamSeason from '../../listTeamSeason/code/listTeamSeason';

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
            if ((i + 1) % 6 === 0) {                
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

function CardTableRow({pData, pIndex}) {
    const currentSection = useSelector((state) => state.currentSection.value);
    const [stItems, setItems] = useState()
    const nameKey = (section) => {
        switch (section) {
            case TEAMS: return "name";
            case SEASONS: return "competitionName";
        }
    }
    useLayoutEffect(() => {
        let index = pIndex.current;
        let items = pData.map((item) => 
            <CardTableItem 
                pData={{
                    name : item[nameKey(currentSection)], 
                    image: item.image
                }} 
                pIndex={item.id} 
            />);
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
    const url = (src, index) => src + `/${index}`;

    useEffect(() => {
        if (currentCard !== pIndex) setActive(false);
    }, [currentCard]);

    const setActiveCard = () => {
        if (stActive) {
            dispatch(setCurrentCard(-1));
        }
        else {
            dispatch(setCurrentCard(pIndex));
        }
        setActive(!stActive);
    }

    return (
        <div 
            className={stActive ? 'card-table-item-active' : 'card-table-item'}
            onClick={() => {
                setActiveCard();
            }}
            onDoubleClick={() => {
                setActiveCard();
                    dispatch(setModalContent(<ListTeamSeason/>));
                    dispatch(setVisibleModal(true));
            }}
        > 
        <div className='card-table-item-image'>
            <img className='card-table-item-image-tag' src={url('/logos',  pData.image)}></img>
        </div>
        <div className='card-table-item-text'>{pData.name}</div>
        </div>
    );
}