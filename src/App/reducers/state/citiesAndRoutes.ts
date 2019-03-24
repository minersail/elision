import { ZoneType } from "../../utils/types";

export const cities = [
    {
        name: "Agadez",
    },        
    {
        name: "Dirkou",
    }
];

export const routes = [
    {
        fromCity: "Agadez",
        toCity: "Dirkou",
        zones: [
            {
                type: ZoneType.Bribery,
                zoneStart: 0,
                zoneEnd: 150,
                chance: 1,
            },                
            {
                type: ZoneType.Bribery,
                zoneStart: 450,
                zoneEnd: 600,
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
                chance: 0.25,
            }
        ],
        distance: 600,
    }
];