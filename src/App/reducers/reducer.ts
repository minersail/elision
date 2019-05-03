import { ActionType, getType } from 'typesafe-actions';
import { MigrantState, State, CityHubType, Resource, NotebookSection, NotebookData, GameScreen } from '../utils/types';
import * as actions from '../actions/actions';
import { startJourney, processDialogue } from './journeyReducers';
import { flipNotebook, goToDefinition } from './notebookReducers';
import idleEvents from './state/idleEvents';
import migrantEvents from './state/migrantEvents';
import zoneEvents from './state/zoneEvents';
import migrants from './state/migrants';
import { cities, routes } from './state/citiesAndRoutes';
import { glossary, glossaryPages } from './state/glossary';

const initialState: State = {
    gameScreen: GameScreen.Start,
    cash: 50000,
    resources: [
        {
            type: Resource.Water,
            count: 10,
            capacity: 40,
        },
        {
            type: Resource.Gas,
            count: 10,
            capacity: 75,
        },
    ],
    notebook: {
        glossary,
        glossaryPages,
        section: NotebookSection.Map,
        active: false,
        mapZoomed: false,
        migrantIndex: 0,
        glossaryIndex: 0,
    },
    migrants,
    pools: {
        migrantPools: migrantEvents,
        zonePools: zoneEvents,
        idlePool: idleEvents,
    },
    cities,
    routes,
    journeyData: {
        currentRoute: routes[0],
        distanceTravelled: 0,
        dayEvents: [],
        day: 0,
        dayTime: "morning",
    },
    currentCity: cities[0],
    currentCityHub: null,
};

function reducer(state: State = initialState, action: Action): State {
    switch(action.type)
    {
        case getType(actions.switchScreen):
            return {
                ...state,
                gameScreen: action.payload,
            };
        case getType(actions.toggleNotebook):
            return {
                ...state,
                notebook: {
                    ...state.notebook,
                    active: action.payload,
                }
            };            
        case getType(actions.flipNotebook):
            return flipNotebook(state, action.payload);
        case getType(actions.goToDefinition):
            return goToDefinition(state, action.payload);
        case getType(actions.switchHub):
            return {
                ...state,
                currentCityHub: action.payload === CityHubType.None ? null : 
                    state.currentCity.hubs.find((hub) => hub !== null && hub.type === action.payload) || state.currentCity.hubs[0],
            };
        case getType(actions.acceptRecruit):
            return {
                ...state,
                cash: state.cash + action.payload.money,
                migrants: state.migrants.map((m) => m.id !== action.payload.migrantID ? m : {
                    ...m,
                    state: MigrantState.Journeying,
                    money: m.money - action.payload.money,
                })
            };
        case getType(actions.startJourney):
            return startJourney(state, action.payload);
        case getType(actions.processDialogue):
            return processDialogue(state, action.payload);
        case getType(actions.purchaseItem):
            return {
                ...state,
                cash: state.cash - (action.payload.price * action.payload.amount),
                resources: state.resources.map(res => res.type === action.payload.resource ? 
                    {...res, count: res.count + action.payload.amount}: res),
            }
        default:
            return state;
    }
}

export type Action = ActionType<typeof actions>;

export default reducer;