import '../styles/changeSeason.css';
import Input from 'rsuite/Input';
import InputGroup from 'rsuite/InputGroup';
import InputNumber from 'rsuite/InputNumber';
import 'rsuite/InputNumber/styles/index.css';
import 'rsuite/Input/styles/index.css';
import 'rsuite/InputGroup/styles/index.css';
import Uploader from 'rsuite/Uploader';
import 'rsuite/Uploader/styles/index.css';
import 'rsuite/Button/styles/index.css';
import { Button, useToaster } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import IconButton from 'rsuite/IconButton';
import { useEffect, useLayoutEffect, useState } from 'react';
import 'rsuite/Notification/styles/index.css';
import 'rsuite/useToaster/styles/index.css';
import { setListSeasons } from '../../../stateManager/listSeasons/listSeasonsSlice';
import { setCurrentSection } from '../../../stateManager/currentSection/currentSectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SEASONS } from '../../../config/config';
import { setVisibleModal } from '../../../stateManager/isVisibleModalWindow/isVisibleModalWindowSlice';
import { success, error } from '../../../common/common';


export default function ChangeSeason({pAction}) {
    const [stBody, setBody] = useState(
        {
            competitionName: '',
            yearEvent: '',
            image: '',
        }
    );

    const [stFileList, setFileList] = useState([]);

    const [stDisableButton, setDisableButton] = useState(true);
    const placement = 'bottomEnd';
    const toaster = useToaster();
    const gstListSeasons = useSelector((state) => state.listSeasons.value);
    const gstCurrentCard = useSelector((state) => state.currentCard.value);
    const dispatch = useDispatch();
    const checkBody = (body) => {
        if 
        (
            body.competitionName !== '' &&
            body.yearEvent !== '' 
            // body.image !== ''
        )
        {
            return false;
        }
        return true;
    }

    useEffect(() => {
        setDisableButton(checkBody(stBody));
    }, [stBody]);

    useLayoutEffect(() => {
        if (pAction === 'EDIT') {
            gstListSeasons.forEach(item => {
                item.id === gstCurrentCard && setBody(item);
            });
        }
    }, []);

    const onSuccesUploadHandler = (fileName) => {
        setBody({...stBody, image: fileName});
    }

    const onChangeNameHandler = (value) => {
        setBody({...stBody, competitionName: value});
    }

    const onChangeYearHandler = (value) => {
        setBody({...stBody, yearEvent: value});
    }


    const getSeasons = async (dispatch) => {
        const res = await fetch('/seasons');
        const json = await res.json();
        dispatch(setListSeasons(json));
        dispatch(setCurrentSection(SEASONS));
    }

    const addSeason = async () => {
        const res = await fetch('/seasons/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(stBody)
        });
        if (res.ok) {
            await getSeasons(dispatch);
            setBody({...setBody, competitionName: '', yearEvent: '', image: ''});
            setFileList([]);
            toaster.push(success(pAction === 'ADD' ? 'Сезон добавлен!' : 'Сезон изменен.'), {placement});
            
        }
        else {
            toaster.push(error('Одно из полей не было заполнено.'), {placement});
        }
    }

    const updateSeason = async () => {
        const res = await fetch('/seasons', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(stBody)
        });
        if (res.ok) {
            await getSeasons(dispatch);
            dispatch(setVisibleModal());
            toaster.push(success(pAction === 'ADD' ? 'Сезон добавлен!' : 'Сезон изменен.'), {placement});
            
        }
        else {
            toaster.push(error('Одно из полей не было заполнено.'), {placement});
        }
    }

    return (
        <div className='change-season'>
            <div className='change-season-header'>
            {pAction === 'ADD' ? 
            'Добавление сезона' : 
            'Редактирование сезона'}
            </div>
            <div className='change-season-container'>
                <InputGroup className='change-season-container-item'>
                    <InputGroup.Addon>Название:</InputGroup.Addon>
                    <Input value={stBody.competitionName} onChange={onChangeNameHandler}/>
                </InputGroup>
                <InputGroup className='change-season-container-item'>
                    <InputGroup.Addon>Год проведения:</InputGroup.Addon>
                    <InputNumber
                        value={stBody.yearEvent} 
                        onChange={onChangeYearHandler}
                        min={2000}
                        max={new Date().getFullYear()}
                    />
                </InputGroup>
                <InputGroup className='change-season-container-item-upload'>
                    <Uploader 
                        fileList={stFileList}
                        onChange={setFileList}
                        action="/logos/upload" 
                        draggable 
                        style={{ height: 60, width: 500}}
                        onSuccess={onSuccesUploadHandler}
                        onError={() => {setFileList([]); toaster.push(error('Неверный формат файла. Загрузите jpeg, jpg или png'), {placement});}}
                    >
                        <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{fontSize: 15}}>Щелкните или перетащите логотип в эту область для загрузки</span>
                        </div>
                    </Uploader>
                </InputGroup>
                <div className='change-season-container-item-buttons'>
                    <Button 
                        className='change-season-button-close' 
                        size='xs' 
                        appearance='ghost'
                        onClick={() => {dispatch(setVisibleModal(false))}}
                    >
                    Отмена
                    </Button>
                    <IconButton 
                        icon={<AddOutlineIcon/>} 
                        className='change-season-button-add' 
                        size='xs' 
                        appearance='primary'
                        disabled={stDisableButton}
                        onClick={pAction === 'ADD' ? addSeason : updateSeason}
                    >
                    {pAction === 'ADD' ? 'Добавить' : 'Редактировать'}
                    </IconButton>
                </div>
            </div>
        </div>
    );
}