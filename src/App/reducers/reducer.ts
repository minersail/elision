import { ActionType, getType } from 'typesafe-actions';
import { MigrantState, State, ZoneType, CityHubType, Resource } from '../utils/types';
import * as actions from '../actions/actions';
import { startJourney, processDialogue } from './journeyReducers';
import idleEvents from './state/idleEvents';
import migrantEvents from './state/migrantEvents';
import zoneEvents from './state/zoneEvents';
import { cities, routes } from './state/citiesAndRoutes';

const initialState: State = {
    gameScreen: -1,
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
    migrants: [
        {
            id: 0,
            name: "Ojeomokhai",
            nationality: "Nigerian",
            languages: ["English", "Yoruba"],
            shortBio: "Ojeomokhai is a 33 year old engineer seeking a better job market for his skill set.",
            bio: "",
            money: 20000,
            state: MigrantState.Open,
        },        
        {
            id: 1,
            name: "Gloria",
            nationality: "Nigerien",
            languages: ["Hausa", "French"],
            shortBio: "A quiet, ambitious woman, Gloria is pursuing higher education in Europe to become a doctor.",
            bio: "",
            money: 20000,
            state: MigrantState.Open,
        },        
        {
            id: 2,
            name: "Calvin",
            nationality: "Cameroonian",
            languages: ["French"],
            shortBio: "Calvin is looking to make it to Spain, where his brother is.",
            bio: "",
            money: 10000,
            state: MigrantState.Open,
        }
    ],
    pools: {
        migrantPools: migrantEvents,
        zonePools: zoneEvents,
        idlePool: idleEvents,
    },
    cities,
    routes,
    journeyData: {
        currentRoute: routes[0],
        forward: true,
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
        case getType(actions.switchHub):
            return {
                ...state,
                currentCityHub: action.payload === CityHubType.None ? null : 
                    state.currentCity.hubs.find((hub) => hub !== null && hub.type === action.payload) || state.currentCity.hubs[0],
            };
        case getType(actions.acceptRecruit):
            return {
                ...state,
                migrants: state.migrants.map((m) => m.id !== action.payload ? m : {
                    ...m,
                    state: MigrantState.Journeying,
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