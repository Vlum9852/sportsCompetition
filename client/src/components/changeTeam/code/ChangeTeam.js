import '../styles/changeTeam.css';
import Input from 'rsuite/Input';
import InputGroup from 'rsuite/InputGroup';
import MaskedInput from 'rsuite/MaskedInput';
import InputNumber from 'rsuite/InputNumber';
import 'rsuite/InputNumber/styles/index.css';
import 'rsuite/Input/styles/index.css';
import 'rsuite/InputGroup/styles/index.css';
import Uploader from 'rsuite/Uploader';
import 'rsuite/Uploader/styles/index.css';
import 'rsuite/Button/styles/index.css';
import { Button, useToaster, Notification } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import IconButton from 'rsuite/IconButton';
import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useSearch } from 'rsuite/esm/internals/Picker';
import { useSelector, useDispatch } from 'react-redux';
import { setListTeams } from '../../../stateManager/listTeams/listTeamsSlice';
import { setCurrentSection } from '../../../stateManager/currentSection/currentSectionSlice';
import { TEAMS, TEAM_SEASON } from '../../../config/config';
import { setVisibleModal } from '../../../stateManager/isVisibleModalWindow/isVisibleModalWindowSlice';
import AddTeamSeason from '../../addTeamSeason/code/AddTeamSeason';



export default function ChangeTeam({pAction}) {
    const [stBody, setBody] = useState({
        name: '',
        country: '',
        image: '',
        formationName: '',
    });
    const [stBodyTeamSeason, setBodyTeamSeason] = useState({
        draw: '',
        team: {},
        season: {},
        points: '',
        win: '',
        losses: '',
    });
    const [stFileList, setFileList] = useState([]);
    const [stDisableButton, setDisableButton] = useState(true);
    const placement = 'bottomEnd';
    const toaster = useToaster();
    const gstCurrentCard = useSelector((state) => state.currentCard.value);
    const gstListTeams = useSelector((state) => state.listTeams.value);
    const dispatch = useDispatch();
    const [stWindow, setWindow] = useState(TEAMS);
    const rfTeam = useRef(0);

    const checkBody = (body) => {
        if 
        (
            body.name !== '' &&
            body.country !== '' &&
            body.image !== '' &&
            body.formationName !== '' 
        )
        {
            return false;
        }
        return true;
    }

    const checkBodyTeamSeason = () => {
        if 
        (
            stBodyTeamSeason.draw !== '' &&
            Object.keys(stBodyTeamSeason.team) !== 0 &&
            Object.keys(stBodyTeamSeason.season) !== 0 &&
            stBodyTeamSeason.points !== '' &&
            stBodyTeamSeason.win !== '' &&
            stBodyTeamSeason.losses !== '' 
        )
        {
            return true;
        }
        return true;
    } 

    useEffect(() => {
        setDisableButton(checkBody(stBody));
    }, [stBody]);

    useLayoutEffect(() => {
        if (pAction === 'EDIT') {
            gstListTeams.forEach(item => {
                item.id === gstCurrentCard && setBody(item);
            });
        }
    }, []);

    const onSuccesUploadHandler = (fileName) => {
        setBody({...stBody, image: fileName});
    }

    const onChangeNameHandler = (value) => {
        setBody({...stBody, name: value});
    }

    const onChangeCountryHandler = (value) => {
        setBody({...stBody, country: value});
    }

    const onChangeFormationNameHandler = (value) => {
        setBody({...stBody, formationName: value});
    }

    const getTeams = async (dispatch) => {
        const res = await fetch('/get-team');
        const json = await res.json();
        dispatch(setListTeams(json));
        dispatch(setCurrentSection(TEAMS));
    }

    const changeWindow = (value = TEAMS) => setWindow(value);

    const addTeamSeason = async (bodyReq, teamRes) => {
        const res = await fetch('/set-team-season', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({...bodyReq, team: teamRes})
        });
        if (res.ok) {

        } else {
            toaster.push(error, {placement});
        }
    }

    const addTeam = async () => {
        const res = await fetch('/set-team', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(stBody)
        });
        if (res.ok) {
            const teamRes = await res.json();
            // setBodyTeamSeason({...stBodyTeamSeason, team: teamRes});
            if (checkBodyTeamSeason()) {
                
                await addTeamSeason(stBodyTeamSeason, teamRes);
            }
            await getTeams(dispatch);
            setBody(
                {...stBody, 
                    name: '', 
                    country: '', 
                    image: '', 
                    formationName: ''
                });
            setFileList([]);
            toaster.push(success, {placement});
            
        }
        else {
            toaster.push(error, {placement});
        }
    }

    const success = (
        <Notification type="success" header="Успешно!" closable>
            <p>{pAction === 'ADD' ? 'Команда добавлена!' : 'Команда изменена.'}</p>
        </Notification>
    );

    const error = (
        <Notification type="error" header="Ошибка!" closable>
            <p>Одно из полей не было заполнено.</p>
        </Notification>
    );
    
    return (
        <div className='change-team'>
            { stWindow === TEAMS ? <><div className='change-team-header'>
                {pAction === 'ADD' ? 
                'Добавление команды' : 
                'Редактирование команды'}
            </div>
            <div className='change-team-container'>
                <InputGroup className='change-team-container-item'>
                    <InputGroup.Addon>Название:</InputGroup.Addon>
                    <Input value={stBody.name} onChange={onChangeNameHandler}/>
                </InputGroup>
                <InputGroup className='change-team-container-item'>
                    <InputGroup.Addon>Страна:</InputGroup.Addon>
                    <Input value={stBody.country} onChange={onChangeCountryHandler}/>
                </InputGroup>
                <InputGroup className='change-team-container-item'>
                    <InputGroup.Addon>Год формирования:</InputGroup.Addon>
                    <InputNumber
                        value={stBody.formationName}
                        onChange={onChangeFormationNameHandler}
                        min={2000}
                        max={new Date().getFullYear()}
                    />
                </InputGroup>
                <InputGroup className='change-team-container-item-upload'>
                    <Uploader 
                        fileList={stFileList}
                        onChange={setFileList}
                        action="/upload-logo" 
                        draggable 
                        style={{ height: 60, width: 500}}
                        onSuccess={onSuccesUploadHandler}>
                        <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>Щелкните или перетащите логотип в эту область для загрузки</span>
                        </div>
                    </Uploader>
                </InputGroup>
                <InputGroup className='change-team-container-item-add-season' style={{width: 260}}>
                    <InputGroup.Addon>Участие в соревновании:</InputGroup.Addon>
                    <Button appearance='primary' size='sm' onClick={changeWindow}>Добавить</Button>
                </InputGroup>

                <div className='change-team-container-item-buttons'>

                    <Button 
                        className='change-team-button-close' 
                        size='xs' 
                        appearance='ghost'
                        onClick={() => {dispatch(setVisibleModal(false))}}
                    >
                    Отмена
                    </Button>
                    <IconButton 
                        icon={<AddOutlineIcon/>} 
                        className='change-team-button-add' 
                        size='xs' 
                        appearance='primary'
                        disabled={stDisableButton}
                        onClick={addTeam}
                    >
                    Добавить
                    </IconButton>
                </div>
            </div></> : 
            <AddTeamSeason 
            pChangeWindow={changeWindow}
            pBodyTeamSeason={stBodyTeamSeason} 
                pSetBodyTeamSeason={setBodyTeamSeason}
            />}
        </div>
    );
}
