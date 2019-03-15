export interface State {
    dialogue: string[];
    demoType: number;
    index: number;
    gameScreen: number;

    cash: number;
    migrants: Migrant[];

    pools: EventPoolManager;
    dayEvents: JourneyEvent[];
    day: number;
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
    Open, Journeying, Succeeded, Failed
}

/* Journey data structures */
export interface RouteData {
    zones: Zone[];
}

export interface Zone {
    zoneStart: number;
    zoneEnd: number;
    type: ZoneType;
}

export enum ZoneType {
    Start, End, Bribery, Bandit
}

export interface EventPoolManager {
    migrantPools: MigrantEventPool[];
    zonePools: ZoneEventPool[];
    idlePool: EventPool;
}

export interface JourneyEvent {
    dialogues: JourneyDialogue[];
    currentDialogueID: number;
}

export interface EventPool {
    events: JourneyEvent[];
}

export interface MigrantEventPool extends EventPool {
    migrantID: number;
    poolIndex: number;
}

export interface ZoneEventPool extends EventPool {
    zoneType: ZoneType;
}

export interface JourneyDialogue {
    id: number;
    text: string;
    options: JourneyOption[];
}

export interface JourneyOption {
    choiceText: string;
    actions: JourneyAction[];
}

export type JourneyAction = {
    actionType: JourneyActionType.EndDialogue;
} | {
    actionType: JourneyActionType.GoToDialogue;
    dialogueId: number;
} | {
    actionType: JourneyActionType.ModifyCash;
    cash: number;
}

export enum JourneyActionType {
    EndDialogue, GoToDialogue, ModifyCash
}

export const createEndDialogue = (text: string): JourneyOption => ({
    choiceText: text,
    actions: [{
        actionType: JourneyActionType.EndDialogue,
    }],
});