import '../styles/main.css';
import 'rsuite/Nav/styles/index.css';
import 'rsuite/Button/styles/index.css';

import Nav from 'rsuite/Nav';
import Button from 'rsuite/Button';
import IconButton from 'rsuite/IconButton';
import 'rsuite/IconButton/styles/index.css';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import CloseOutlineIcon from '@rsuite/icons/CloseOutline';
import EditIcon from '@rsuite/icons/Edit';
import CardTable from '../../cardTable/code/CardTable';
import { useSelector, useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setCurrentSection } from '../../../stateManager/currentSection/currentSectionSlice';
import ModalWindow from '../../modalWindow/code/ModalWindow';
import { setVisibleModal } from '../../../stateManager/isVisibleModalWindow/isVisibleModalWindowSlice';
import { setModalContent } from '../../../stateManager/modalWindowContent/modalWindowContentSlice';
import { setListTeams } from '../../../stateManager/listTeams/listTeamsSlice';
import { TEAMS, SEASONS, SEASON_SCHEDULE } from '../../../config/config';


const tempData = [
    {season: 'Кубок России'},
    {season: 'Кубок России по футзалу'},
    {season: 'Суперкубок России'},
    {season: 'Суперкубок России по футзалу'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
]

const tempDataSecond = [
    {season: 'Кубок России'},
    {season: 'Кубок России по футзалу'},
    {season: 'Суперкубок России'},
    {season: 'Суперкубок России по футзалу'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
    {season: 'Лига легенд'},
]
const tempDataеThird = [
    {season: 'Кубок России'},

]

export default function Main({}) {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(setCurrentSection(SEASON_SCHEDULE));
    }, []);

    return (
        <div className='main'>
            <MainConteiner>
                <MainNav/>
                <MainContent/>
                <MainTools/>
                <ModalWindow/>
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

function MainNav({}) {
    const currentSection = useSelector((state) => state.currentSection.value);
    const dispatch = useDispatch();

    return (
        <div className='main-nav'>
            <Nav appearance='tabs' >
                <Nav.Item 
                    active={currentSection === SEASON_SCHEDULE ? true : false} 
                    eventKey={SEASON_SCHEDULE}
                    onClick={() => {dispatch(setCurrentSection(SEASON_SCHEDULE))}}
                    >
                    Расписание сезонов
                </Nav.Item>
                <Nav.Item 
                    active={currentSection === TEAMS ? true : false} 
                    eventKey={TEAMS}
                    onClick={async () => {
                        const res = await fetch('/get-team');
                        const json = await res.json();
                        dispatch(setListTeams(json));
                        dispatch(setCurrentSection(TEAMS));

                    }}
                    >
                    Команды
                </Nav.Item>
                <Nav.Item 
                    active={currentSection === SEASONS ? true : false} 
                    eventKey={SEASONS}
                    onClick={() => {dispatch(setCurrentSection(SEASONS))}}
                    >
                    Сезоны
                </Nav.Item>
            </Nav>
        </div>
    );
}

function MainContent({}) {
    const currentSection = useSelector((state) => state.currentSection.value);
    const listTeams = useSelector((state) => state.listTeams.value);
    return (
        <div className='main-content'>
            {(currentSection === SEASON_SCHEDULE) && <CardTable pData={tempData} />}
            {(currentSection === TEAMS) && <CardTable pData={listTeams} />}
            {(currentSection === SEASONS) && <CardTable pData={tempDataеThird} />}
        </div>
    );
}

function MainTools({}) {
    const dispatch = useDispatch();

    return (
        <div className='main-tools'>
            <IconButton 
                icon={<AddOutlineIcon/>} 
                className='main-tools-button' 
                size='xs' 
                appearance='ghost'
                onClick={() => {
                    // dispatch(setModalContent(<div className='dskl'></div>));
                    dispatch(setVisibleModal(true));  
                }}
            >
                Добавить
            </IconButton>
            <IconButton icon={<EditIcon/>} className='main-tools-button' size='xs' appearance='ghost'>Редактировать</IconButton>
            <IconButton icon={<CloseOutlineIcon/>} className='main-tools-button' size='xs' appearance='ghost'>Удалить</IconButton>
        </div>
    );
}