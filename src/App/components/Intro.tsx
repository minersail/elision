import * as React from "react";

interface IntroProps {
    switchScreen: (screenID: number) => void;
}

function Intro(props: IntroProps) {

	return (
        <div className="intro-container">
            <div className="intro">
                <h1>Elision</h1>
                <p>The migrant smuggling industry is a multi-billion dollar underground operation. 
                    Ranging from highly organized crime syndicates to informal, local groups of acquaintances,
                    migrant smuggling groups influence the movement of most of the 244 million migrants per year.</p>
                <p>Your name is Ibrahim, and you are a former migrant who has returned to Turkey to work. In the
                    absence of consistent work, you decide to try your hand locally in the industry that once
                    helped you escape.</p>
                <button onClick={ () => {props.switchScreen(0);} }>Continue</button>
            </div>
        </div>
    );
}

export default Intro;