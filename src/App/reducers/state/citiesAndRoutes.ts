import { ZoneType, CityData, RouteData, CityHubType, Resource } from "../../utils/types";

export const routes: RouteData[] = [
    {
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
    }
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
        }]
    },        
    {
        name: "Dirkou",
        hubs: [{
            name: "Main Street",
            type: CityHubType.Recruitment,
            migrants: [],
        },
        {
            name: "Journey",
            type: CityHubType.Journey,
            destinations: getDestinations("Dirkou"),
        }]
    }
];

function getDestinations(city: string): string[] {
    return routes.reduce((acc, x) => {
        if (x.toCity === city) {
            return [...acc, x.fromCity]
        }

        if (x.fromCity === city) {
            return [...acc, x.toCity]
        }

        return acc;
    }, [] as string[]);
}