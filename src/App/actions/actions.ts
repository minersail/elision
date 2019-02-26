import { createAction } from 'typesafe-actions';

export const nextDialogue = createAction('actions/dialogue/NEXT');
export const switchScreen = createAction("actions/game/SWITCHSCREEN", (resolve) => {
    return (screenId: number) => resolve(screenId);
});