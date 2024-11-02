import { InputGroup, InputPicker, Input, Button, InputNumber } from 'rsuite';
import '../styles/addTeamSeason.css';
import { useLayoutEffect, useState, useEffect } from 'react';
import useData from 'rsuite/esm/InputPicker/hooks/useData';
import { useDispatch, useSelector } from 'react-redux';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import IconButton from 'rsuite/IconButton';
// import { setListSeasons } from '../../../stateManager/listSeasons/listSeasonsSlice';

export default function AddTeamSeason({pChangeWindow, pBodyTeamSeason, pSetBodyTeamSeason}) {
    const dispatch = useDispatch();
    const [stDataPicker, setDataPicker] = useState();
    const [stDisable, setDisable] = useState(true);
    const gstListSeasons = useSelector((state) => state.listSeasons.value);
    useLayoutEffect (() => {
        //getSeasons();
        setDataPicker(gstListSeasons.map(item => ({label: item.competitionName, value: item})));
    }, []);

    const getSeasons = async () => {
        const res = await fetch('/get-seasons');
        const json = await res.json();
        setDataPicker(json.map(item => ({label: item.competitionName, value: item})));
    }

    return ( 
        <div className='add-team-season'>
            <div className='add-team-season-header'>
                Добавление сезона
            </div>
            <div className='add-team-season-container'>
                <InputGroup className='add-team-season-container-item-picker'>
                    <InputGroup.Addon>Сезон:</InputGroup.Addon>
                    <InputPicker data={stDataPicker} onChange={(value) => {
                        pSetBodyTeamSeason({...pBodyTeamSeason, season: value});
                    }}/>
                </InputGroup>
                <InputGroup className='add-team-season-container-item'>
                    <InputGroup.Addon>Количество побед:</InputGroup.Addon>
                    <InputNumber 
                        min={0} 
                        onChange={(value) => {pSetBodyTeamSeason({...pBodyTeamSeason, win: value })}}/>
                </InputGroup>
                <InputGroup className='add-team-season-container-item'>
                    <InputGroup.Addon>Количество поражений:</InputGroup.Addon>
                    <InputNumber 
                        min={0}
                        onChange={(value) => {pSetBodyTeamSeason({...pBodyTeamSeason, losses: value })}}
                    />
                </InputGroup>
                <InputGroup className='add-team-season-container-item'>
                    <InputGroup.Addon>Количество ничьей:</InputGroup.Addon>
                    <InputNumber 
                        min={0}
                        onChange={(value) => {pSetBodyTeamSeason({...pBodyTeamSeason, draw: value })}}
                    />
                </InputGroup>
                <InputGroup className='add-team-season-container-item'>
                    <InputGroup.Addon>Количество баллов:</InputGroup.Addon>
                    <InputNumber 
                        min={0}
                        onChange={(value) => {pSetBodyTeamSeason({...pBodyTeamSeason, points: value })}}
                    />
                </InputGroup>
                <div className='add-team-season-container-item-buttons'>
                    <Button 
                            className='add-team-season-button-close' 
                            size='sm' 
                            appearance='ghost'
                            onClick={() => {pChangeWindow()}}
                        >
                        Отмена
                    </Button>
                    <IconButton 
                        icon={<AddOutlineIcon/>} 
                        className='add-team-season-button-add' 
                        size='sm' 
                        appearance='primary'
                        disabled={false}
                    >
                    Добавить
                    </IconButton>
                </div>
            </div>
        </div>
    );
}