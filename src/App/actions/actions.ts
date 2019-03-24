import { createAction } from 'typesafe-actions';
import { JourneyAction } from '../utils/types';

export const switchScreen = createAction("actions/game/SWITCHSCREEN", (resolve) => {
    return (screenId: number) => resolve(screenId);
});
export const acceptRecruit = createAction("actions/mainstreet/ACCEPTRECRUIT", (resolve) => {
    return (migrantID: number) => resolve(migrantID);
});
export const startJourney = createAction("actions/journey/STARTJOURNEY");
export const processDialogue = createAction("actions/journey/PROCESSDIALOGUE", (resolve) => {
    return (actions: JourneyAction[]) => resolve(actions);
});