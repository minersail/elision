import { createAction } from 'typesafe-actions';
import { JourneyAction, CityHubType } from '../utils/types';

export const switchScreen = createAction("actions/game/SWITCHSCREEN", (resolve) => {
    return (screenId: number) => resolve(screenId);
});
export const switchHub = createAction("actions/city/SWITCHHUB", (resolve) => {
    return (hubType: CityHubType) => resolve(hubType);
});
export const acceptRecruit = createAction("actions/city/ACCEPTRECRUIT", (resolve) => {
    return (migrantID: number) => resolve(migrantID);
});
export const startJourney = createAction("actions/journey/STARTJOURNEY", (resolve) => {
    return (destination: string) => resolve(destination);
});
export const processDialogue = createAction("actions/journey/PROCESSDIALOGUE", (resolve) => {
    return (actions: JourneyAction[]) => resolve(actions);
});