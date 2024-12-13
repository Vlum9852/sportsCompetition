import '../styles/changeTeam.css';
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
import { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setListTeams } from '../../../stateManager/listTeams/listTeamsSlice';
import { setCurrentSection } from '../../../stateManager/currentSection/currentSectionSlice';
import { TEAMS } from '../../../config/config';
import { setVisibleModal } from '../../../stateManager/isVisibleModalWindow/isVisibleModalWindowSlice';
import { success, error } from '../../../common/common';
import InputPicker from 'rsuite/InputPicker';
import country from 'country-list-js';
// (Optional) Import component styles. If you are using Less, import the `index.less` file. 
import 'rsuite/InputPicker/styles/index.css';
import { useCountries } from 'use-react-countries';
import translate from 'translate';
export default function ChangeTeam({pAction}) {
    const [stBody, setBody] = useState({
        name: '',
        country: '',
        image: '',
        formationName: '',
    });
    const [stFileList, setFileList] = useState([]);
    const [stDisableButton, setDisableButton] = useState(true);
    const placement = 'bottomEnd';
    const toaster = useToaster();
    const gstCurrentCard = useSelector((state) => state.currentCard.value);
    const gstListTeams = useSelector((state) => state.listTeams.value);
    const dispatch = useDispatch();
    const [stCountries, setCountries] = useState();
    const { countries } = useCountries()
    
    const setDataCounties = async () => {
        let data = [];
        // for (let i = 0; i < data.lenght; i++) {
        //      console.log(await translate(countries[i].name, 'ru'))
         
        // }
        countries.forEach(async item => {
            let json = {
                label: '',
                value: ''
            }
            const name = await translate(item.name, 'ru');

            json.label = name;
            json.value = name;
            data.push(json)
        });
        // const name = await translate(countries[0].name, 'ru');
        // console.log(data);
        setCountries(data);
    }
    // setDataCounties();
    useEffect(() => {
        setDataCounties();
    }, []);

    const checkBody = (body) => {
        if 
        (
            body.name !== '' &&
            body.country !== '' &&
            // body.image !== '' &&
            body.formationName !== '' 
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
        const res = await fetch('/teams');
        const json = await res.json();
        dispatch(setListTeams(json));
        dispatch(setCurrentSection(TEAMS));
    }

    const addTeam = async () => {
        const res = await fetch('/teams/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(stBody)
        });
        if (res.ok) {
            await getTeams(dispatch);
            setBody(
                {...stBody, 
                    name: '', 
                    country: '', 
                    image: '', 
                    formationName: ''
                });
            setFileList([]);
            toaster.push(success(pAction === 'ADD' ? 'Команда добавлена!' : 'Команда изменена.'), {placement});   
        }
        else {
            toaster.push(error('Одно из полей не было заполнено.'), {placement});
        }
    }

    const updTeam = async () => {
        const res = await fetch('/teams', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(stBody)
        });
        if (res.ok) {
            await getTeams(dispatch);
            dispatch(setVisibleModal());
            toaster.push(success(pAction === 'ADD' ? 'Команда добавлена!' : 'Команда изменена.'), {placement});
            
        }
        else {
            toaster.push(error('Одно из полей не было заполнено.'), {placement});
        }
    }


    
    return (
        <div className='change-team'>
            <div className='change-team-header'>
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
                    {/* <Input value={stBody.country} onChange={onChangeCountryHandler}/> */}
                    <InputPicker className='my-picker' value={stBody.country}  data={stCountries} onChange={onChangeCountryHandler} searchable/>
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
                        action="/logos/upload" 
                        draggable 
                        style={{ height: 60, width: 500}}
                        multiple={false}
                        
                    //     shouldQueueUpdate={(fileList, newFile) => {
                    //  console.log(newFile);
                    //       }}
                        onSuccess={onSuccesUploadHandler}>
                        <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>Щелкните или перетащите логотип в эту область для загрузки</span>
                        </div>
                        
                    </Uploader>
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
                        onClick={pAction === 'ADD' ? addTeam : updTeam}
                    >
                    {pAction === 'ADD' ? 'Добавить' : 'Редактировать'}
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
