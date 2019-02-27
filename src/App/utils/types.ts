export interface State {
    dialogue: string[];
    demoType: number;
    index: number;
    gameScreen: number;

    cash: number;
    migrants: Migrant[];
    journeyData: JourneyData;
}

export interface Migrant {
    id: number,
    name: string;
    nationality: string;
    languages: string[];
    shortBio: string;
    bio: string;

    state: MigrantState;
}

export enum MigrantState {
    Open, Selected, Succeeded, Failed
}

export interface JourneyData {
    days: JourneyDay[];
    index: number;
}

export interface JourneyDay {
    text: string;
    options: JourneyOption[];
}

export interface JourneyOption {
    choiceText: string;
    action: JourneyAction;
}

export type JourneyAction = {
    actionType: JourneyActionType.Continue;
} | {
    actionType: JourneyActionType.ModifyCash;
    cash: number;
}

export enum JourneyActionType {
    Continue, ModifyCash
}

export const ContinueOption: JourneyOption = {
    choiceText: "Proceed",
    action: {
        actionType: JourneyActionType.Continue,
    }
}