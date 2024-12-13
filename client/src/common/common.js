import { TEAMS, SEASONS } from "../config/config";
import { Notification } from "rsuite";
import { setListSeasons } from "../stateManager/listSeasons/listSeasonsSlice";
import { setCurrentSection } from "../stateManager/currentSection/currentSectionSlice";
import { setListTeams } from "../stateManager/listTeams/listTeamsSlice";
export const error = (text) => (
    <Notification type="error" header="Ошибка!" closable>
        <p>{text}</p>
    </Notification>
);

export const success = (text) => (
    <Notification type="success" header="Успешно!" closable>
        <p>{text}</p>
    </Notification>
);

export const getTeams = async (dispatch) => {
    const res = await fetch('/teams');
    const json = await res.json();
    dispatch(setListTeams(json));
    dispatch(setCurrentSection(TEAMS));
}

export const getSeasons = async (dispatch) => {
    const res = await fetch('/seasons');
    const json = await res.json();
    dispatch(setListSeasons(json));
    dispatch(setCurrentSection(SEASONS));
}