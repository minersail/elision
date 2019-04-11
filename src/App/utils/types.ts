export interface State {
    gameScreen: number;

    cash: number;
    migrants: Migrant[];
    resources: ResourceUnit[];

    pools: EventPoolManager;

    cities: CityData[];
    routes: RouteData[];

    journeyData: JourneyData;
    
    currentCity: CityData;
    currentCityHub: CityHub;
}

export interface Migrant {
    id: number,
    name: string;
    nationality: string;
    languages: string[];
    shortBio: string;
    bio: string;
    money: number;

    state: MigrantState;
}

export enum MigrantState {
    Open, Journeying, Succeeded, Failed
}

export enum CityHubType {
    None, Recruitment, Journey, Shop
}

export type CityHub = {
    name: string;
    type: CityHubType.Recruitment;
    migrants: number[]; // IDs
} | {
    name: string;
    type: CityHubType.Journey;
    destinations: string[]; // Names
} | {
    name: string;
    type: CityHubType.Shop;
    resources: ResourceUnit[];
    prices: Map<number, Resource>;
} | null // Null for main screen (not in hub)

// Graph nodes
export interface CityData {
    name: string;
    hubs: CityHub[];
}

// Graph edges (two-way, zones go from fromCity to toCity)
export interface RouteData {
    fromCity: string;
    toCity: string;
    zones: Zone[];
    distance: number;
}

/* ********************
Start journey data structures
******************** */
export interface JourneyData { // Tracks the current journey
    currentRoute: RouteData;
    forward: boolean; // Going from fromCity to toCity or other way around
    distanceTravelled: number; // In km

    dayEvents: JourneyEvent[];
    day: number;
    dayTime: "morning" | "afternoon" | "night";
}

export interface Zone {
    type: ZoneType;
    zoneStart: number; // In km
    zoneEnd: number;
    chance: number; // In decimal percentage
}

export enum ZoneType {
    Bribery, Bandit, NaturalDisaster
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

/* ********************
End journey data structures
******************** */

export enum Resource {
    Water, Gas
}

export interface ResourceUnit {
    type: Resource;
    count: number;
    capacity: number;
}

export const resString = (res: Resource): string => {
    switch (res) {
        case Resource.Water:
            return "Water";
        case Resource.Gas:
            return "Gas";
    }
}