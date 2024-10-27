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
import { Button } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import IconButton from 'rsuite/IconButton';

export default function ChangeTeam({pAction}) {

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
                    <Input/>
                </InputGroup>
                <InputGroup className='change-team-container-item'>
                    <InputGroup.Addon>Страна:</InputGroup.Addon>
                    <Input/>
                </InputGroup>
                <InputGroup className='change-team-container-item'>
                    <InputGroup.Addon>Год формирования:</InputGroup.Addon>
                    <InputNumber/>
                </InputGroup>
                <InputGroup className='change-team-container-item-upload'>
                    <Uploader action="" draggable style={{ height: 60, width: 500}}>
                        <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>Щелкните или перетащите логотип в эту область для загрузки</span>
                        </div>
                    </Uploader>
                </InputGroup>
                <InputGroup className='change-team-container-item-add-season' style={{width: 260}}>
                    <InputGroup.Addon>Участие в соревновании:</InputGroup.Addon>
                    <Button appearance='primary' size='sm'>Добавить</Button>
                </InputGroup>

                <div className='change-team-container-item-buttons'>

                    <Button 
                        className='change-team-button-close' 
                        size='xs' 
                        appearance='ghost'
                    >
                    Отмена
                    </Button>
                    <IconButton 
                        icon={<AddOutlineIcon/>} 
                        className='change-team-button-add' 
                        size='xs' 
                        appearance='primary'
                    >
                    Добавить
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
