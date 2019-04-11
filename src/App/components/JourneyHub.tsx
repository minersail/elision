import * as React from "react";
import { CityHubType } from "../utils/types";

interface JourneyHubProps {
    hubName: string;
    destinations: string[];

    switchHub: (hubType: CityHubType) => void;
    startJourney: (destination: string) => void;
}

function JourneyHub(props: JourneyHubProps) {
    return (
        <div className="city-container">
            <h1 className="city-title">{ props.hubName }</h1>
            <div className="city-grid">            
                <button onClick={ () => { props.switchHub(CityHubType.None) } }>Back</button>
                {
                    props.destinations.map((dest, i) => (
                        <button onClick={ () => { props.startJourney(dest); } } key={ i }>{ dest }</button>
                    ))
                }
            </div>
        </div>
    );
}

export default JourneyHub;