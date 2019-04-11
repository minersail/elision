import * as React from "react";
import { JourneyAction, JourneyDialogue, } from "../utils/types";

interface JourneyProps {
    destination: string;
    day: number;
    dayTime: string,
    distRemaining: number;

    dialogue: JourneyDialogue;
    
    processDialogue: (actions: JourneyAction[]) => void;
}

function Journey(props: JourneyProps) {
	return (
        <div className={ "journey-container " + props.dayTime }>
            <h1 className="journey-destination">{ props.distRemaining }km to { props.destination }</h1>
            <h3 className="journey-day">Day { props.day }, { props.dayTime }</h3>
            <div className="info-container inverted">
                <div className="info">{ props.dialogue.text }</div>
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