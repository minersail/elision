import { ZoneType, CityData, RouteData, CityHubType, Resource } from "../../utils/types";

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
        // {
        //     type: ZoneType.Bribery,
        //     zoneStart: 450,
        //     zoneEnd: 600,
        //     chance: 1,
        // },                
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
    distance: 584,
};

export const routes: RouteData[] = [
    agaToDir,
    getReversedRoute(agaToDir),
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
                chance: 0.5,
            },                
            {
                type: ZoneType.Bandit,
                zoneStart: 100,
                zoneEnd: 500,
                chance: 0.4,
            }
        ],
        distance: 770,
    },
];

export const cities: CityData[] = [
    {
        name: "Agadez",
        hubs: [{
            name: "Bus Stop",
            type: CityHubType.Recruitment,
            migrants: [0, 1, 2],
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
                    count: 5,
                    capacity: 5,
                },                
                {
                    type: Resource.Gas,
                    count: 5,
                    capacity: 5,
                }
            ],
            prices: new Map([
                [Resource.Water, 180],
                [Resource.Gas, 235],
            ]),
        }],
        recruitString: "Agadez is the last bus stop of the ECOWAS zone, an area of West Africa where nationals \
        may travel freely between countries without a passport. Jumping off the buses are tired but eager faces ready \
        to start the next leg of their journey.",
        recruitString2: "You approach the crowd, and immediately a few individuals rush towards you, speaking in a myriad of \
        languages. It's fortunate that the smuggling trade is so freely visible in Agadez, you muse.",
    },        
    {
        name: "Dirkou",
        hubs: [{
            name: "Main Street",
            type: CityHubType.Recruitment,
            migrants: [3, 4, 5],
        },
        {
            name: "Journey",
            type: CityHubType.Journey,
            destinations: getDestinations("Dirkou"),
        }],
        recruitString: "Small groups of people are clustered around tarps. You see their clothing and hear their \
        languages, and assess that some of the groups are Tuareg, and the others are Toubou. Knowing that they are \
        in contention over the smuggling routes in this area, you approach the area with caution.",
        recruitString2: "You hear a couple languages that are foreign to you, but pick out broken English and French. \
        You turn to their source, grateful that you learned the right bridge languages.",
    },
    {
        name: "Qatrun",
        hubs: [{
            name: "Bus Stop",
            type: CityHubType.Recruitment,
            migrants: [6, 7],
        },
        {
            name: "Journey",
            type: CityHubType.Journey,
            destinations: getDestinations("Qatrun"),
        }],
        recruitString: "",
        recruitString2: "",
    },
    {
        name: "Sabha",
        hubs: [{
            name: "Bus Stop",
            type: CityHubType.Recruitment,
            migrants: [8, 9],
        },
        {
            name: "Journey",
            type: CityHubType.Journey,
            destinations: getDestinations("Sabha"),
        }],
        recruitString: "",
        recruitString2: "",
    },
    {
        name: "Tripoli",
        hubs: [],
        recruitString: "",
        recruitString2: "",
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