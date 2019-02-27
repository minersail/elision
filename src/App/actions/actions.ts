import { createAction } from 'typesafe-actions';
import { JourneyAction } from '../utils/types';

export const nextDialogue = createAction('actions/dialogue/NEXT');
export const switchScreen = createAction("actions/game/SWITCHSCREEN", (resolve) => {
    return (screenId: number) => resolve(screenId);
});
export const acceptRecruit = createAction("actions/mainstreet/ACCEPTRECRUIT", (resolve) => {
    return (migrantID: number) => resolve(migrantID);
});
export const chooseJourneyOption = createAction("actions/journey/CHOOSEOPTION", (resolve) => {
    return (action: JourneyAction) => resolve(action);
});