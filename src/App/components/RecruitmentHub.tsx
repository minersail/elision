import * as React from "react";
import { Migrant, MigrantState, CityHubType } from "../utils/types";

interface RecruitmentHubProps {
    hubName: string;
    migrants: Migrant[];

    switchHub: (hubType: CityHubType) => void;
    acceptRecruit: (migrantID: number) => void;
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
                            <div className="info">You approach { selected.name }, and discreetly ask if migrant services are needed. After 
                            a short conversation, you gauge that { selected.name } has enough interest to consider your proposal.</div>
                            <div className="info-choice-container">
                                <button className="info-choice" onClick={ () => { this.props.acceptRecruit(selected.id); this.setState({...this.state, selectedRecruit: null, showRecruits: false}); } }>Accept { selected.name }</button>
                                <button className="info-choice" onClick={ () => { this.setState({...this.state, selectedRecruit: null, showRecruits: false}); } }>Change your mind</button>
                            </div>
                        </>
                    }                    
                    {
                        selected === null &&
                        <>
                        {
                            this.state.showRecruits &&
                            <>
                                <div className="info">You approach the crowd, and immediately a few individuals rush towards you, speaking in a myriad of
                                languages. It's fortunate that the smuggling trade is so freely visible in Agadez, you muse.</div>
                                <div className="info-choice-container">
                                    <button className="info-choice" onClick={ () => { this.setState({...this.state, showRecruits: false}); } }>Change your mind.</button>
                                </div>
                            </>
                        }
                        {
                            !this.state.showRecruits &&
                            <>
                                <div className="info">Agadez is the last bus stop of the ECOWAS zone, an area of West Africa where nationals
                                may travel freely between countries without a passport. Jumping off the buses are tired but eager faces ready
                                to start the next leg of their journey.</div>
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