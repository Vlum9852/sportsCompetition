import '../styles/changeSeason.css';
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

export default function ChangeSeason({pAction}) {

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
                    <Input/>
                </InputGroup>
                <InputGroup className='change-season-container-item'>
                    <InputGroup.Addon>Год проведения:</InputGroup.Addon>
                    <InputNumber/>
                </InputGroup>
                <InputGroup className='change-season-container-item-upload'>
                    <Uploader action="" draggable style={{ height: 60, width: 500}}>
                        <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>Щелкните или перетащите логотип в эту область для загрузки</span>
                        </div>
                    </Uploader>
                </InputGroup>
                <div className='change-season-container-item-buttons'>
                    <Button 
                        className='change-season-button-close' 
                        size='xs' 
                        appearance='ghost'
                    >
                    Отмена
                    </Button>
                    <IconButton 
                        icon={<AddOutlineIcon/>} 
                        className='change-season-button-add' 
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