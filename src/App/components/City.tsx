import * as React from "react";

interface CityProps {
    name: string;
}

function City(props: CityProps) {
	return (
        <div className="city-container">
            <h1 className="city-title">{ props.name }</h1>
            <div className="city-grid">
                <button>Safehouse</button>
                <button>Safehouse</button>
                <button>Safehouse</button>
                <button>Safehouse</button>
                <button>Safehouse</button>
                <button>Safehouse</button>
            </div>
        </div>
    );
}

export default City;