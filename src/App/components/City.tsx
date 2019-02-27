import * as React from "react";

interface CityProps {
    name: string;
    hasSelectedMigrants: boolean;

    switchScreen: (screenId: number) => void;
}

function City(props: CityProps) {
	return (
        <div className="city-container">
            <h1 className="city-title">{ props.name }</h1>
            <div className="city-grid">
                <button onClick={ () => { props.switchScreen(1); } }>Main Street</button>
                {
                    props.hasSelectedMigrants &&
                    <button onClick={ () => { props.switchScreen(2); } }>Journey</button>
                }
            </div>
        </div>
    );
}

export default City;