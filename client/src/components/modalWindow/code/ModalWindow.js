import { useDispatch, useSelector } from 'react-redux';
import '../styles/modalWindow.css';
import CloseIcon from '@rsuite/icons/Close';
import { setVisibleModal } from '../../../stateManager/isVisibleModalWindow/isVisibleModalWindowSlice';
import { useEffect, useState } from 'react';
import { setCurrentCard } from '../../../stateManager/currentCard/currentCardSlice';

export default function ModalWindow({pSize}) {
    const gstIsVisibleModalWindow = useSelector((state) => state.isVisibleModalWindow.value);
    const dispatch = useDispatch();
    const gstModalWindowContent = useSelector((state) => state.modalWindowContent.value);
    const [stSizeClassName, setSizeClassName] = useState(String(pSize).toLowerCase()); 
    
    useEffect(() => {
        setSizeClassName(String(pSize).toLowerCase());
    }, [pSize]);

    return (
        gstIsVisibleModalWindow && <div className={`modal-window-${stSizeClassName}`}>
            <div className={`modal-window-container-${stSizeClassName}`}>
                <CloseIcon 
                    className='modal-window-close'
                    onClick={() => {dispatch(setVisibleModal(false)); dispatch(setCurrentCard(-1))}}
                />
                {gstModalWindowContent}
            </div>
        </div> 
    );
}