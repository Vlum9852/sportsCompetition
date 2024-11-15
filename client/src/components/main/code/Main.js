import '../styles/main.css';
import 'rsuite/Nav/styles/index.css';
import 'rsuite/Button/styles/index.css';

import Nav from 'rsuite/Nav';
import IconButton from 'rsuite/IconButton';
import 'rsuite/IconButton/styles/index.css';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';
import EditIcon from '@rsuite/icons/Edit';
import CardTable from '../../cardTable/code/CardTable';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import ModalWindow from '../../modalWindow/code/ModalWindow';
import { setVisibleModal } from '../../../stateManager/isVisibleModalWindow/isVisibleModalWindowSlice';
import { setModalContent } from '../../../stateManager/modalWindowContent/modalWindowContentSlice';
import { TEAMS, SEASONS } from '../../../config/config';
import ChangeTeam from '../../changeTeam/code/ChangeTeam';
import ChangeSeason from '../../changeSeason/code/ChangeSeason';
import AddTeamSeason from '../../addTeamSeason/code/AddTeamSeason';
import { useToaster } from 'rsuite';
import { getTeams, getSeasons, error } from '../../../common/common';

export default function Main() {
    const currentSection = useSelector((state) => state.currentSection.value);
    const dispatch = useDispatch();
    const [stModalSize, setModalSize] = useState('DEFAULT');

    useEffect(() => {
        setModalSize(currentSection === TEAMS ? 'DEFAULT' : 'SMALL');
    }, [currentSection]);

    useLayoutEffect(() => {
        getTeams(dispatch);
        
    }, []);

    return (
        <div className='main'>
            <MainConteiner>
                <MainNav/>
                <MainContent/>
                <MainTools/>
                <ModalWindow pSize={stModalSize}/>
            </MainConteiner>
        </div>
    );
}

function MainConteiner({children}) {
    return (
        <div className='main-container'>
            {children}
        </div>
    );
}

function MainNav() {
    const currentSection = useSelector((state) => state.currentSection.value);
    const dispatch = useDispatch();

    return (
        <div className='main-nav'>
            <Nav appearance='tabs' >
                <Nav.Item 
                    active={currentSection === TEAMS ? true : false} 
                    eventKey={TEAMS}
                    onClick={async () => {
                        getTeams(dispatch);
                    }}
                    >
                    Команды
                </Nav.Item>
                <Nav.Item 
                    active={currentSection === SEASONS ? true : false} 
                    eventKey={SEASONS}
                    onClick={() => {getSeasons(dispatch)}}
                    >
                    Сезоны
                </Nav.Item>
            </Nav>
        </div>
    );
}

function MainContent() {

    const currentSection = useSelector((state) => state.currentSection.value);
    const listTeams = useSelector((state) => state.listTeams.value);
    const listSeasons = useSelector((state) => state.listSeasons.value);

    return (
        <div className='main-content'>
            {(currentSection === TEAMS) && <CardTable pData={listTeams} />}
            {(currentSection === SEASONS) && <CardTable pData={listSeasons} />}
        </div>
    );
}




function MainTools({}) {
    const dispatch = useDispatch();
    const currentSection = useSelector((state) => state.currentSection.value);
    const currentCard = useSelector((state) => state.currentCard.value);
    const toaster = useToaster();
    const placement = 'bottomEnd';
    const currentCardCheck = value => value === -1 ? true : false;
    const deleteHandler = async () => {
        if (currentSection === SEASONS) {
            const res = await fetch(`/seasons/delete/${currentCard}`, {method: 'DELETE'});
            if (res.ok) {
                getSeasons(dispatch);
            }
            else {
                toaster.push(error('невозможно совершить удаление'), {placement});
            }
        } else {
            const res = await fetch(`/teams/delete/${currentCard}`, {method: 'DELETE'});
            if (res.ok) {
                getTeams(dispatch);
            }
            else {
                toaster.push(error('невозможно совершить удаление'), {placement});
            }
        }
    }
    return (
        <div className='main-tools'>
            <IconButton 
                icon={<AddOutlineIcon/>} 
                className='main-tools-button' 
                size='xs' 
                appearance='ghost'
                onClick={() => {
                    (currentSection === TEAMS) && dispatch(setModalContent(<ChangeTeam pAction={'ADD'}/>));
                    (currentSection === SEASONS) && dispatch(setModalContent(<ChangeSeason pAction={'ADD'}/>));
                    dispatch(setVisibleModal(true));  
                }}
            >
                Добавить
            </IconButton>
            {
                currentSection === TEAMS &&
                <IconButton
                    icon={<AddOutlineIcon/>} 
                    className='main-tools-button' 
                    size='xs' 
                    appearance='ghost'
                    disabled={currentCardCheck(currentCard)} 
                    onClick={() => {
                        dispatch(setModalContent(<AddTeamSeason/>));
                        dispatch(setVisibleModal(true));  
                    }}
                >
                    участие в сезоне
                </IconButton>
            }
            <IconButton 
                icon={<EditIcon/>} 
                className='main-tools-button' 
                size='xs' 
                appearance='ghost'
                disabled={currentCardCheck(currentCard)} 
                onClick={() => {
                    (currentSection === TEAMS) && dispatch(setModalContent(<ChangeTeam pAction={'EDIT'}/>));
                    (currentSection === SEASONS) && dispatch(setModalContent(<ChangeSeason pAction={'EDIT'}/>));
                    dispatch(setVisibleModal(true));  
                }}
            >
            Редактировать
            </IconButton>
            <IconButton 
                icon={<CloseOutlineIcon/>} 
                className='main-tools-button' 
                size='xs' 
                appearance='ghost'
                disabled={currentCardCheck(currentCard)}
                onClick={deleteHandler}>
            Удалить
            </IconButton>
        </div>
    );
}