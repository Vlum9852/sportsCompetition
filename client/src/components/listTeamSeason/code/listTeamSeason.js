import { useLayoutEffect, useState } from 'react';
import '../styles/listTeamSeason.css';
import "rsuite/Table/styles/index.css";
import { Table } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { TEAMS } from '../../../config/config';
import { setModalContent } from '../../../stateManager/modalWindowContent/modalWindowContentSlice';
import AddTeamSeason from '../../addTeamSeason/code/AddTeamSeason';
const { Column, HeaderCell, Cell } = Table;

export default function ListTeamSeason() {
    const [stBody, setBody] = useState();
    const currentCard = useSelector((state) => state.currentCard.value);
    const currentSection = useSelector((state) => state.currentSection.value);
    const [stLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        getData();
    }, []);

    const request = async () => {
        return currentSection === TEAMS ?
            await fetch(`/seasons/by-teams/${currentCard}`) :
            await fetch(`/teams/by-seasons/${currentCard}`);

    }

    const getData = async () => {
        const res = await request();
        const json = await res.json();
        setBody(json);
        setLoading(false);
    } 
    return (
        <div className='list-team-season'>
            <Table 
                loading={stLoading} 
                fillHeight  
                cellBordered 
                data={stBody} 
                disabledScroll
                onRowClick={(item) => {
                    console.log(item);
                    dispatch(setModalContent(<AddTeamSeason pData={item} pAction={'EDIT'}/>));
                }}
            >
                <Column fullText  minWidth={300} width={300}  align="center" fixed>
                    <HeaderCell align='center'>
                        {currentSection === TEAMS ? 'Сезон' : 'Команда'}
                        </HeaderCell>
                    <Cell 
                        dataKey={
                            currentSection === TEAMS ? 
                                'season.competitionName' :
                                'team.name'
                            } 
                    />
                </Column>
                <Column fullText  minWidth={60} width={60} align="center" fixed>
                    <HeaderCell>Побед</HeaderCell>
                    <Cell dataKey="win" />
                </Column>
                <Column fullText minWidth={80} width={80}  align="center" fixed>
                    <HeaderCell>Поражения</HeaderCell>
                    <Cell dataKey="losses" />
                </Column>
                <Column fullText minWidth={60} width={60} align="center" fixed>
                    <HeaderCell>Ничьи</HeaderCell>
                    <Cell dataKey="draw" />
                </Column>
                <Column fullText minWidth={65} width={65}  align="center" fixed>
                    <HeaderCell>Счет</HeaderCell>
                    <Cell dataKey="points" />
                </Column>
                
            </Table>
        </div>
    );
}

