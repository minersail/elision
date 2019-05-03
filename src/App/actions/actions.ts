import { createAction } from 'typesafe-actions';
import { JourneyAction, CityHubType, Resource, GameScreen } from '../utils/types';

export const switchScreen = createAction("actions/game/SWITCHSCREEN", (resolve) => {
    return (gameScreen: GameScreen) => resolve(gameScreen);
});
export const toggleNotebook = createAction("actions/game/TOGGLENOTEBOOK", (resolve) => {
    return (enable: boolean) => resolve(enable);
});
export const flipNotebook = createAction("actions/game/FLIPNOTEBOOK", (resolve) => {
    return (forwards: boolean) => resolve(forwards);
});
export const switchHub = createAction("actions/city/SWITCHHUB", (resolve) => {
    return (hubType: CityHubType) => resolve(hubType);
});
export const acceptRecruit = createAction("actions/city/ACCEPTRECRUIT", (resolve) => {
    return (migrantID: number, money: number) => resolve({migrantID, money});
});
export const startJourney = createAction("actions/journey/STARTJOURNEY", (resolve) => {
    return (destination: string) => resolve(destination);
});
export const processDialogue = createAction("actions/journey/PROCESSDIALOGUE", (resolve) => {
    return (actions: JourneyAction[]) => resolve(actions);
});
export const purchaseItem = createAction("actions/city/PURCHASEITEM", (resolve) => {
    return (resource: Resource, amount: number, price: number) => resolve({resource, amount, price});
});