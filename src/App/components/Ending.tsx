import * as React from "react";

interface EndingProps {
    resetGame: () => void;
}

function Ending(props: EndingProps) {
	return (
        <div className="ending-container">
            <div className="ending">
                <h1>Game Over</h1>
                <p>Your journey has ended - you are one of the 700 migrants who die every year in the Sahara pursuing a better future.</p>
                <button onClick={ () => { props.resetGame(); } }>Begin anew</button>
            </div>
        </div>
    );
}

export default Ending;