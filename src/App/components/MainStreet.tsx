import * as React from "react";
import { Migrant, MigrantState } from "../utils/types";

interface MainStreetProps {
    info: string;
    migrants: Migrant[];

    switchScreen: (screenId: number) => void;
    acceptRecruit: (migrantID: number) => void;
}

interface MainStreetState {
    showRecruits: boolean;
    selectedRecruit: Migrant | null;
}

class MainStreet extends React.Component<MainStreetProps, MainStreetState> {
    public constructor(props: MainStreetProps) {
        super(props);
        this.state = {
            showRecruits: false,
            selectedRecruit: null,
        }
    }

    public render() {
        const selected = this.state.selectedRecruit;

        return (
            <div className="city-container">
                <h1 className="city-title">Main Street</h1>
                <div className="info-container">
                    {
                        selected === null &&
                        [<div className="info" key="0">{ this.props.info }</div>,
                        <div className="info-choice-container" key="1">
                            <button className="info-choice" onClick={ () => { this.setState({...this.state, showRecruits: true}); } }>Look around</button>
                            <button className="info-choice" onClick={ () => { this.props.switchScreen(0); } }>Return to the city</button>
                        </div>]
                    }                    
                    {
                        selected !== null &&
                        [<div className="info" key="0">You approach { selected.name }, and discreetly ask if migrant services are needed. After 
                        a short conversation, you gauge that { selected.name } has enough interest to consider your proposal.</div>,
                        <div className="info-choice-container" key="1">
                            <button className="info-choice" onClick={ () => { this.props.acceptRecruit(selected.id); this.props.switchScreen(0); } }>Accept { selected.name }</button>
                            <button className="info-choice" onClick={ () => { this.setState({...this.state, selectedRecruit: null, showRecruits: false}); } }>Change your mind</button>
                        </div>]
                    }
                </div>
                    
                {
                    this.state.showRecruits && 
                    this.props.migrants.filter((migrant) => migrant.state === MigrantState.Open && migrant !== selected).map((migrant) => 
                    (
                        <div className="recruit-container" key={ migrant.id }>
                            <div className="recruit">
                                <h3>{ migrant.name }</h3>
                                <p>{ migrant.name } is a { migrant.nationality } who 
                                speaks { migrant.languages.slice(0, -1).join(", ") + " and " + migrant.languages.slice(-1).pop() }.</p>
                                <p>{ migrant.shortBio }</p>
                                <button onClick={ () => { this.setState({...this.state, selectedRecruit: migrant}); } }>Select</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default MainStreet;