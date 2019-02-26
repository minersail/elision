import * as React from "react";

interface JourneyProps {
    destination: string;
    day: number;
}

function Journey(props: JourneyProps) {
	return (
        <div className="journey-container">
            <h1 className="journey-destination">{ props.destination }</h1>
            <h1 className="journey-day">{ props.day }</h1>
            <div className="journey-info">
                <p>Hello</p>
            </div>
        </div>
    );
}

export default Journey;