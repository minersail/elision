import * as React from "react";
import { CityData, CityHubType, Migrant, CityHub, Resource, ResourceUnit } from "../utils/types";
import RecruitmentHub from "./RecruitmentHub";
import JourneyHub from "./JourneyHub";
import ShopHub from "./ShopHub";

interface CityProps {
    city: CityData;
    currentHub: CityHub;
    hasSelectedMigrants: boolean;
    migrants: Migrant[];
    resources: ResourceUnit[];

    goToDefinition: (key: string) => void;
    switchHub: (hubType: CityHubType) => void;
    acceptRecruit: (migrantId: number, money: number) => void;
    startJourney: (destination: string) => void;
    purchaseItem: (resource: Resource, amount: number, price: number) => void;
}

function City(props: CityProps) {
	return (
        <>
        {
            props.currentHub === null &&
            <div className="city-container">            
                <h1 className="city-title">{ props.city.name }</h1>
                <div className="city-grid"> 
                {
                    props.city.hubs.map((hub, i) => hub !== null && (
                        <button onClick={ () => { props.switchHub(hub.type); } } key={ i }>{ hub.name }</button>
                    ))
                }
                </div>
            </div>

            ||

            props.currentHub !== null && props.currentHub.type === CityHubType.Recruitment &&    
            <RecruitmentHub hubName={ props.currentHub.name } switchHub={ props.switchHub } acceptRecruit={ props.acceptRecruit }
            recruitString={ props.city.recruitString } recruitString2={ props.city.recruitString2 } goToDefinition={ props.goToDefinition }
            migrants={ props.migrants.filter((migrant) => props.currentHub !== null && 
                props.currentHub.type === CityHubType.Recruitment && props.currentHub.migrants.includes(migrant.id)) } />            

            ||

            props.currentHub !== null && props.currentHub.type === CityHubType.Journey &&    
            <JourneyHub hubName={ props.currentHub.name } switchHub={ props.switchHub } startJourney={ props.startJourney } 
            destinations={ props.currentHub.destinations } />            

            ||

            props.currentHub !== null && props.currentHub.type === CityHubType.Shop &&    
            <ShopHub hubName={ props.currentHub.name } resources={ props.currentHub.resources } prices={ props.currentHub.prices }
            switchHub={ props.switchHub } purchaseItem={ props.purchaseItem } />
        }
        </>
    );
}

export default City;