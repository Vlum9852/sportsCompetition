import { useDispatch, useSelector } from 'react-redux';
import '../styles/modalWindow.css';
import CloseIcon from '@rsuite/icons/Close';
import { setVisibleModal } from '../../../stateManager/isVisibleModalWindow/isVisibleModalWindowSlice';

export default function ModalWindow() {
    const gstIsVisibleModalWindow = useSelector((state) => state.isVisibleModalWindow.value);
    const dispatch = useDispatch();
    const gstModalWindowContent = useSelector((state) => state.modalWindowContent.value);

    return (
        gstIsVisibleModalWindow && <div className='modal-window'>
            <div className='modal-window-container'>
                <CloseIcon 
                    className='modal-window-close'
                    onClick={() => {dispatch(setVisibleModal(false))}}
                />
                {gstModalWindowContent}
            </div>
        </div> 
    );
}