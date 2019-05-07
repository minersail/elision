import * as React from "react";
import { GameScreen } from "../utils/types";

interface IntroProps {
    switchScreen: (gameScreen: number) => void;
}

function Intro(props: IntroProps) {
	return (
        <div className="intro-container">
            <div className="intro">
                <h1>Elision</h1>
                <p>The migrant smuggling industry is a multi-billion dollar underground operation. 
                    Ranging from highly organized crime syndicates to informal, local groups of acquaintances,
                    migrant smuggling groups influence the movement of most of the 244 million migrants per year.</p>
                <p>Your name is Ibrahim, and you are a aspiring migrant in Agadez, Niger who desires 
                    to go to Europe. In the absence of stable job options, you decide to fund your trip by trying your 
                    hand locally in the smuggling industry, not as a migrant, but as a smuggler.</p>
                <p>Your goal is to search for migrants who will pay you for your services as a smuggler. Migrants will
                    always pay upfront, and you can then use this money to purchase resources before heading off on 
                    your journey. As you travel from city to city, your goal is to accumulate enough money to pay for
                    a ferry ride in Libya.</p>
                <button onClick={ () => {props.switchScreen(GameScreen.City);} }>Continue</button>
            </div>
        </div>
    );
}

export default Intro;