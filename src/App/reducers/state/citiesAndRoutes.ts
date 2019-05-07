import { ZoneType, CityData, RouteData, CityHubType, Resource } from "../../utils/types";
import { WATER_LITER_PRICE, GAS_LITER_PRICE } from "../../utils/constants";

const agaToDir: RouteData = {
    fromCity: "Agadez",
    toCity: "Dirkou",
    zones: [
        {
            type: ZoneType.Bribery,
            zoneStart: 50,
            zoneEnd: 100,
            chance: 1,
        },            
        {
            type: ZoneType.NaturalDisaster,
            zoneStart: 100,
            zoneEnd: 500,
            chance: 0.3,
        },                
        {
            type: ZoneType.Bandit,
            zoneStart: 100,
            zoneEnd: 500,
            chance: 0.4,
        }
    ],
    distance: 584,
};

export const routes: RouteData[] = [
    agaToDir,
    // getReversedRoute(agaToDir), // This function works but there will be no backwards routes in this iteration of this game.
    {
        fromCity: "Dirkou",
        toCity: "Qatrun",
        zones: [
            {
                type: ZoneType.Bribery,
                zoneStart: 50,
                zoneEnd: 100,
                chance: 1,
            },           
            {
                type: ZoneType.NaturalDisaster,
                zoneStart: 100,
                zoneEnd: 500,
                chance: 0.5,
            },                
            {
                type: ZoneType.Bandit,
                zoneStart: 100,
                zoneEnd: 500,
                chance: 0.4,
            }
        ],
        distance: 678,
    },
    {
        fromCity: "Qatrun",
        toCity: "Sabha",
        zones: [
            {
                type: ZoneType.Bribery,
                zoneStart: 50,
                zoneEnd: 100,
                chance: 1,
            },             
            {
                type: ZoneType.NaturalDisaster,
                zoneStart: 100,
                zoneEnd: 500,
                chance: 0.5,
            },                
            {
                type: ZoneType.Bandit,
                zoneStart: 100,
                zoneEnd: 500,
                chance: 0.4,
            }
        ],
        distance: 324,
    },
    {
        fromCity: "Sabha",
        toCity: "Tripoli",
        zones: [
            {
                type: ZoneType.Bribery,
                zoneStart: 50,
                zoneEnd: 100,
                chance: 1,
            },            
            {
                type: ZoneType.NaturalDisaster,
                zoneStart: 100,
                zoneEnd: 500,
                chance: 0.3,
            },                
            {
                type: ZoneType.Bandit,
                zoneStart: 100,
                zoneEnd: 500,
                chance: 0.3,
            }
        ],
        distance: 770,
    },
];

export const cities: CityData[] = [
    {
        name: "Agadez",
        description: "Agadez was once a bustling tourist town, the quintessential rustic Saharan city. Due to an outbreak of \
        terrorist attacks several years ago throughout the region, Agadez's tourism industry dried up overnight. Ever since, \
        the residents of Agadez have found other ways to make ends meet.",
        hubs: [{
            name: "Bus Stop",
            type: CityHubType.Recruitment,
            migrants: [0, 1, 2],
            recruitString: "Agadez is the last bus stop of the ECOWAS zone, an area of West Africa where nationals \
            may travel freely between countries without a passport. Jumping off the buses are tired but eager faces ready \
            to start the next leg of their journey.",
            recruitString2: "You approach the crowd, and immediately a few individuals rush towards you, speaking in a myriad of \
            languages. It's fortunate that the smuggling trade is so freely visible in Agadez, you muse.",
        },
        {
            name: "Journey",
            type: CityHubType.Journey,
            destinations: getDestinations("Agadez"),
        },
        {
            name: "Market",
            type: CityHubType.Shop,
            resources: [
                {
                    type: Resource.Water,
                    count: 100,
                    capacity: 5,
                },                
                {
                    type: Resource.Gas,
                    count: 100,
                    capacity: 5,
                }
            ],
            prices: new Map([
                [Resource.Water, WATER_LITER_PRICE],
                [Resource.Gas, GAS_LITER_PRICE],
            ]),
        }],
    },        
    {
        name: "Dirkou",
        description: "A border town in many senses of the phrase, Dirkou is both the last smuggling hub before Libya \
        and the border between the territories of the Toubou and Tuareg. Despite being relatively small, Dirkou bustles \
        with the large demand for goods created by migrants.",
        hubs: [{
            name: "Main Street",
            type: CityHubType.Recruitment,
            migrants: [3, 4, 5],
            recruitString: "Small groups of people are clustered around tarps. You see their clothing and hear their \
            languages, and assess that some of the groups are Tuareg, and the others are Toubou. Knowing that they are \
            in contention over the smuggling routes in this area, you approach the area with caution.",
            recruitString2: "You hear a couple languages that are foreign to you, but pick out broken English and French. \
            You turn to their source, grateful that you learned the right bridge languages.",
        },
        {
            name: "Journey",
            type: CityHubType.Journey,
            destinations: getDestinations("Dirkou"),
        },
        {
            name: "Market",
            type: CityHubType.Shop,
            resources: [
                {
                    type: Resource.Water,
                    count: 100,
                    capacity: 5,
                },                
                {
                    type: Resource.Gas,
                    count: 100,
                    capacity: 5,
                }
            ],
            prices: new Map([
                [Resource.Water, WATER_LITER_PRICE],
                [Resource.Gas, GAS_LITER_PRICE],
            ]),
        }],
    },
    {
        name: "Qatrun",
        description: "Qatrun is a secondary border checkpoint into Libya from Niger. Its citizens are no strangers to \
        conflict, as Qatrun was a hotly contested city during the Libyan civil war.",
        hubs: [{
            name: "Bus Stop",
            type: CityHubType.Recruitment,
            migrants: [6, 7],
            recruitString: "The air is quiet - many of Qatrun's residents are temporary, working until they can afford \
            another trip northwards. Hopefully, you can persuade a few that you'd make a trustworthy driver.",
            recruitString2: "You call out to a group of people, and you are immediately shushed. After ducking into a \
            nearby warehouse, you are informed that a local Toubou group is cracking down on smuggling in exchange for \
            European money. In hushed tones, you decide what to do next.",
        },
        {
            name: "Journey",
            type: CityHubType.Journey,
            destinations: getDestinations("Qatrun"),
        },
        {
            name: "Market",
            type: CityHubType.Shop,
            resources: [
                {
                    type: Resource.Water,
                    count: 100,
                    capacity: 5,
                },                
                {
                    type: Resource.Gas,
                    count: 100,
                    capacity: 5,
                }
            ],
            prices: new Map([
                [Resource.Water, WATER_LITER_PRICE],
                [Resource.Gas, GAS_LITER_PRICE],
            ]),
        }],
    },
    {
        name: "Sabha",
        description: "",
        hubs: [{
            name: "Bus Stop",
            type: CityHubType.Recruitment,
            migrants: [8, 9],
            recruitString: "",
            recruitString2: "",
        },
        {
            name: "Journey",
            type: CityHubType.Journey,
            destinations: getDestinations("Sabha"),
        },
        {
            name: "Market",
            type: CityHubType.Shop,
            resources: [
                {
                    type: Resource.Water,
                    count: 100,
                    capacity: 5,
                },                
                {
                    type: Resource.Gas,
                    count: 100,
                    capacity: 5,
                }
            ],
            prices: new Map([
                [Resource.Water, WATER_LITER_PRICE],
                [Resource.Gas, GAS_LITER_PRICE],
            ]),
        }],
    },
    {
        name: "Tripoli",
        description: "",
        hubs: [],
    },
];

function getReversedRoute(route: RouteData): RouteData {
    return {
        fromCity: route.toCity,
        toCity: route.fromCity,
        zones: route.zones.map(zone => ({...zone, zoneStart: route.distance - zone.zoneStart, zoneEnd: route.distance - zone.zoneEnd })),
        distance: route.distance,
    }
}

function getDestinations(city: string): string[] {
    return routes.reduce((acc, x) => x.fromCity === city ? [...acc, x.toCity] : acc, [] as string[]);
}