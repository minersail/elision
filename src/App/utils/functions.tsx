import * as React from "react";
import { glossary } from "../reducers/state/glossary";
import { routes } from "../reducers/state/citiesAndRoutes";
import { JOURNEY_COST } from "./constants";
import { AssertionError } from "assert";

function generateLinks(text: string, goToDefinition: (key: string) => void): JSX.Element {
    const separatorRegex = new RegExp(glossary.map(g => g.keys.join("|")).join("|"), "g");    
    const glossaryHits = text.match(separatorRegex);

    if (glossaryHits === null) {
        return (<>{ text }</>);
    }

    const glossaryJSX = glossaryHits.map((x, i) => (<React.Fragment key={ i }>{ 
        <span className="definition" onClick={ () => { goToDefinition(x); } }>{ x }</span> 
    }</React.Fragment>));
    const textChunks = text.split(separatorRegex);

    return (
        <>{
            textChunks.flatMap((v, i) => i >= glossaryJSX.length ? [v] : [v, glossaryJSX[i]])
        }</>
    );
}

function getJourneyCost(startCity: string, endCity: string): number {
    let cost = 0;
    let tempCity = startCity;
    
    while (tempCity !== endCity) {
        for (const route of routes) {
            if (route.fromCity === tempCity) {
                tempCity = route.toCity;
                break;
            }
        }

        cost += JOURNEY_COST;
    }

    return cost;
}

export { generateLinks, getJourneyCost };