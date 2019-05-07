export interface State {
    gameScreen: GameScreen;

    cash: number;
    migrants: Migrant[];
    resources: ResourceUnit[];
    notebook: NotebookData;

    pools: EventPoolManager;

    cities: CityData[];
    routes: RouteData[];

    journeyData: JourneyData;
    
    // TODO: currentCityHub is redundant data - replace it with CityHubType | null
    currentCity: CityData;
    currentCityHub: CityHub | null; // Null for main screen (not in hub)
}

export enum GameScreen {
    Start, City, Journey, End
}

export interface Migrant {
    id: number,
    name: string;
    nationality: string;
    languages: string[];
    shortBio: string;
    bio: string;
    money: number;

    destination: string;

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

    recruitString: string;
    recruitString2: string;
} | {
    name: string;
    type: CityHubType.Journey;
    destinations: string[]; // Names
} | {
    name: string;
    type: CityHubType.Shop;
    resources: ResourceUnit[];
    prices: Map<number, Resource>;
}

// Graph nodes
export interface CityData {
    name: string;
    description: string;
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
    distanceTravelled: number; // In km

    dayEvents: JourneyEvent[];
    day: number;
    dayTime: "morning" | "afternoon" | "night";

    speed: JourneySpeed;
}

export enum JourneySpeed {
    Driving, Walking, Stopped
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
    resourceEventPool: ResourceEventPool[];
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

export interface ResourceEventPool extends EventPool {
    initialEvent: JourneyEvent;
    initialEventCompleted: boolean;
    resourceType: Resource;
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
} | {
    actionType: JourneyActionType.ModifyWater;
    water: number;
} | {
    actionType: JourneyActionType.ModifyDistance;
    distance: number;
} | {
    actionType: JourneyActionType.NegateTravel;
} | {
    actionType: JourneyActionType.MoveToCity;
} | {
    actionType: JourneyActionType.SwitchSpeed;
    speed: JourneySpeed;
} | {
    actionType: JourneyActionType.ResetResourceEvent;
    resource: Resource;
} | {
    actionType: JourneyActionType.ModifyGas;
    gas: number;
} | {
    actionType: JourneyActionType.LoseMigrant;
    migrantId: number;
} | {
    actionType: JourneyActionType.LoseAllMigrants;
} | {
    actionType: JourneyActionType.LoseGame;
}

export enum JourneyActionType {
    EndDialogue, GoToDialogue, ModifyCash, ModifyWater, ModifyGas, ModifyDistance, 
    NegateTravel, MoveToCity, SwitchSpeed, ResetResourceEvent, LoseMigrant, LoseAllMigrants, LoseGame
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

/* ********************
Start notebook data structures
******************** */

export interface NotebookData {
    glossary: GlossaryEntry[];
    glossaryPages: GlossaryPage[];

    section: NotebookSection;
    
    active: boolean;
    mapZoomed: boolean;
    migrantIndex: number;
    glossaryIndex: number;
}

export enum NotebookSection {
    Map, Biography, Glossary
}

export interface GlossaryEntry {
    name: string;
    keys: string[];
    definition: string;
}

export interface GlossaryPage {
    start: string;
    end: string;
}

/* ********************
End notebook data structures
******************** */