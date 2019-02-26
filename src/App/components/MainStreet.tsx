import * as React from "react";

interface MainStreetProps {
    info: string;
    switchScreen: (screenId: number) => void;
}

function MainStreet(props: MainStreetProps) {
	return (
        <div className="city-container">
            <h1 className="city-title">Main Street</h1>
            <div className="city-info-container">
                <div className="city-info">{ props.info }</div>
                <div className="city-info-choice-container">
                    <button className="city-info-choice">Look around</button>
                    <button className="city-info-choice" onClick={ () => { props.switchScreen(0); } }>Return to the city</button>
                </div>
            </div>
        </div>
    );
}

export default MainStreet;