import { InputGroup, InputPicker, Input, Button, InputNumber, useToaster, Notification } from 'rsuite';
import '../styles/addTeamSeason.css';
import { useLayoutEffect, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import IconButton from 'rsuite/IconButton';
import { setVisibleModal } from '../../../stateManager/isVisibleModalWindow/isVisibleModalWindowSlice';
import { success, error } from '../../../common/common';

const BODY_TEAM_SEASON_EMPTY = {
    draw: '',
    team: {},
    season: {},
    points: '',
    win: '',
    losses: '',
}

export default function AddTeamSeason({}) {
    const dispatch = useDispatch();
    const [stDataPicker, setDataPicker] = useState();
    const [stDisable, setDisable] = useState(true);
    const gstListSeasons = useSelector((state) => state.listSeasons.value);
    const toaster = useToaster();
    const placement = 'bottomEnd';
    const [stBodyTeamSeason, setBodyTeamSeason] = useState(BODY_TEAM_SEASON_EMPTY);
    const gstListTeams = useSelector((state) => state.listTeams.value);
    const gstCurrentCard = useSelector((state) => state.currentCard.value);
    const [stTeam, setTeam] = useState();

    useLayoutEffect (() => {
        gstListTeams.forEach(item => {
            item.id === gstCurrentCard && setTeam(item);
        });
        setDataPicker(gstListSeasons.map(item => ({label: item.competitionName, value: item})));
    }, []);

    useEffect(() => {
        checkBodyTeamSeason(stBodyTeamSeason) && setDisable(false);
    }, [stBodyTeamSeason]);

    const checkBodyTeamSeason = (body) => {
        console.log(body);
        if 
        (
            body.draw === '' ||
            Object.keys(body.season) === 0 ||
            body.points === '' ||
            body.win === '' ||
            body.losses === '' 
        )
        {
            return false;
        }
        return true;
    } 

    const addTeamSeason = async (bodyReq, teamRes) => {
        const res = await fetch('/teams/add-season', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({...bodyReq, team: teamRes})
        });
        if (res.ok) {
            setBodyTeamSeason(BODY_TEAM_SEASON_EMPTY);
            toaster.push(success('Добавлено участие в сезоне'), {placement});
        } else {
            toaster.push(error('Одно из полей не было заполнено.'), {placement});
        }
    }






    return ( 
        <div className='add-team-season'>
            <div className='add-team-season-header'>
                Добавление сезона
            </div>
            <div className='add-team-season-container'>
                <div className='add-team-season-container-item-picker'>
                    {/* <div className='item-picker-addon'>Сезон:</div> */}
                    <InputPicker 
                        className='season-picker' 
                        placeholder={'Выбрать сезон'} 
                        data={stDataPicker}
                        value={stBodyTeamSeason.season}
                        onChange={(value) => {
                        setBodyTeamSeason({...stBodyTeamSeason, season: value});
                    }}/>
                </div>
                <InputGroup className='add-team-season-container-item'>
                    <InputGroup.Addon>Количество побед:</InputGroup.Addon>
                    <InputNumber 
                        min={0} 
                        value={stBodyTeamSeason.win}
                        onChange={(value) => {setBodyTeamSeason({...stBodyTeamSeason, win: value })}}/>
                </InputGroup>
                <InputGroup className='add-team-season-container-item'>
                    <InputGroup.Addon>Количество поражений:</InputGroup.Addon>
                    <InputNumber 
                        min={0}
                        value={stBodyTeamSeason.losses}
                        onChange={(value) => {setBodyTeamSeason({...stBodyTeamSeason, losses: value })}}
                    />
                </InputGroup>
                <InputGroup className='add-team-season-container-item'>
                    <InputGroup.Addon>Количество ничьей:</InputGroup.Addon>
                    <InputNumber 
                        min={0}
                        value={stBodyTeamSeason.draw}
                        onChange={(value) => {setBodyTeamSeason({...stBodyTeamSeason, draw: value })}}
                    />
                </InputGroup>
                <InputGroup className='add-team-season-container-item'>
                    <InputGroup.Addon>Количество баллов:</InputGroup.Addon>
                    <InputNumber 
                        min={0}
                        value={stBodyTeamSeason.points}
                        onChange={(value) => {setBodyTeamSeason({...stBodyTeamSeason, points: value })}}
                    />
                </InputGroup>
                <div className='add-team-season-container-item-buttons'>
                    <Button 
                            className='add-team-season-button-close' 
                            size='sm' 
                            appearance='ghost'
                            onClick={() => {dispatch(setVisibleModal(false))}}
                            >
                        Отмена
                    </Button>
                    <IconButton 
                        icon={<AddOutlineIcon/>} 
                        className='add-team-season-button-add' 
                        size='sm' 
                        appearance='primary'
                        disabled={stDisable}
                        onClick={() => {addTeamSeason(stBodyTeamSeason, stTeam)}}
                    >
                    Добавить
                    </IconButton>
                </div>
            </div>
        </div>
    );
}