import * as React from "react";
import { Migrant, MigrantState, CityHubType, CityData } from "../utils/types";
import { JOURNEY_COST } from "../utils/constants";
import generateLinks from "../utils/functions";

interface RecruitmentHubProps {
    hubName: string;
    migrants: Migrant[];

    recruitString: string;
    recruitString2: string;

    goToDefinition: (key: string) => void;
    switchHub: (hubType: CityHubType) => void;
    acceptRecruit: (migrantID: number, money: number) => void;
}

interface RecruitmentHubState {
    showRecruits: boolean;
    selectedRecruit: Migrant | null;
}

class RecruitmentHub extends React.Component<RecruitmentHubProps, RecruitmentHubState> {
    public constructor(props: RecruitmentHubProps) {
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
                <h1 className="city-title">{ this.props.hubName }</h1>
                <div className="info-container">                 
                    {
                        selected !== null &&
                        <>
                        {
                            selected.money >= JOURNEY_COST &&        
                            <>
                                <div className="info">You approach { selected.name }, and discreetly ask if migrant services are needed. After 
                                a short conversation, you gauge that { selected.name } has enough interest to consider your proposal.</div>
                                <div className="info-choice-container">
                                    <button className="info-choice" onClick={ () => { 
                                        this.props.acceptRecruit(selected.id, JOURNEY_COST); 
                                        this.setState({...this.state, selectedRecruit: null, showRecruits: false}); 
                                    } }>Accept { selected.name }</button>
                                    <button className="info-choice" onClick={ () => {
                                        this.setState({...this.state, selectedRecruit: null, showRecruits: false}); 
                                    } }>Change your mind</button>
                                </div>
                            </>
                            ||
                            <>
                                <div className="info">You approach { selected.name }, and discreetly ask if migrant services are needed. However,
                                { selected.name } only has { selected.money } CFA, not enough to pay for the entire journey.</div>
                                <div className="info-choice-container">
                                    <button className="info-choice" onClick={ () => { 
                                        this.props.acceptRecruit(selected.id, selected.money);
                                        this.setState({...this.state, selectedRecruit: null, showRecruits: false}); 
                                    } }>Take { selected.name } on anyways.</button>
                                    <button className="info-choice" onClick={ () => {
                                        this.setState({...this.state, selectedRecruit: null, showRecruits: false}); 
                                    } }>Change your mind</button>
                                </div>
                            </>
                        }
                        </>
                    }                    
                    {
                        selected === null &&
                        <>
                        {
                            this.state.showRecruits &&
                            <>
                                <div className="info">{ this.props.recruitString2 }</div>
                                <div className="info-choice-container">
                                    <button className="info-choice" onClick={ () => { this.setState({...this.state, showRecruits: false}); } }>Change your mind.</button>
                                </div>
                            </>
                        }
                        {
                            !this.state.showRecruits &&
                            <>
                                <div className="info">{ generateLinks(this.props.recruitString, this.props.goToDefinition) }</div>
                                <div className="info-choice-container">
                                    <button className="info-choice" onClick={ () => { this.setState({...this.state, showRecruits: true}); } }>Look around</button>
                                    <button className="info-choice" onClick={ () => { this.props.switchHub(CityHubType.None); } }>Return to the city</button>
                                </div>
                            </>
                        }
                        </>
                    }
                </div>                    
                {
                    this.state.showRecruits &&                     
                    <div className="recruit-container">
                    {
                        this.props.migrants.filter((migrant) => migrant.state === MigrantState.Open && migrant !== selected).map((migrant, i) => 
                        (
                            <div className="recruit" key={ i }>
                                <h3>{ migrant.name }</h3>
                                <p>{ migrant.name } is a { migrant.nationality } who 
                                speaks { migrant.languages.slice(0, -1).join(", ") + (migrant.languages.length > 1 ? " and " : "") + migrant.languages.slice(-1).pop() }.</p>
                                <p>{ migrant.shortBio }</p>
                                <button onClick={ () => { this.setState({...this.state, selectedRecruit: migrant, showRecruits: false}); } }>Select</button>
                            </div>
                        ))
                    }
                    </div>
                }
            </div>
        );
    }
}

export default RecruitmentHub;