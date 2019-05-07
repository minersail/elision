import * as React from "react";
import { JourneyAction, JourneyDialogue, } from "../utils/types";
import { generateLinks } from "../utils/functions";

interface JourneyProps {
    destination: string;
    day: number;
    dayTime: string,
    distRemaining: number;

    dialogue: JourneyDialogue;
    
    processDialogue: (actions: JourneyAction[]) => void;
    goToDefinition: (key: string) => void;
}

function Journey(props: JourneyProps) {
	return (
        <div className={ "journey-container " + props.dayTime }>
            <h1 className="journey-destination">{ props.distRemaining }km to { props.destination }</h1>
            <h3 className="journey-day">Day { props.day }, { props.dayTime }</h3>
            <div className="info-container inverted">
                <div className="info">{ generateLinks(props.dialogue.text, props.goToDefinition) }</div>
                <div className="info-choice-container">
                    {
                        props.dialogue.options.map((option, index) => 
                            <button className="info-choice" key={ index } 
                            onClick={ () => { props.processDialogue(option.actions) } }>{ option.choiceText }</button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Journey;