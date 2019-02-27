import * as React from "react";
import { JourneyAction, JourneyData, JourneyDay } from "../utils/types";

interface JourneyProps {
    destination: string;
    day: number;
    data: JourneyData;
    
    chooseOption: (action: JourneyAction) => void;
}

function Journey(props: JourneyProps) {
    // TODO: Change props to only include day
    const day: JourneyDay = props.data.days[props.data.index];

	return (
        <div className="journey-container">
            <h1 className="journey-destination">Journey to { props.destination }</h1>
            <h3 className="journey-day">Day { props.day }</h3>
            <div className="info-container inverted">
                <div className="info">{ day.text }</div>
                <div className="info-choice-container">
                    {
                        day.options.map((option, index) => 
                            (<button className="info-choice" key={ index } 
                            onClick={ () => { props.chooseOption(option.action) } }>{ option.choiceText }</button>)
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Journey;