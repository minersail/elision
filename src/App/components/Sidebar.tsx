import * as React from "react";
import { Migrant, ResourceUnit, resString } from "../utils/types";

interface SidebarProps {
    notebookActive: boolean;

    name: string;
    reputation: string;
    cash: number;
    resources: ResourceUnit[];

    inverted: boolean;

    activeMigrants: Migrant[];

    toggleNotebook: (enable: boolean) => void;
}

// TODO: remove - this is temporary
interface SidebarState {
    showMap: boolean;
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props);

        this.state = { showMap: false };
    }

    public render() {
        return (
            <div className={ "sidebar-container" + (this.props.inverted ? " inverted" : "") }>
                <h1 className="sidebar-name">{ this.props.name }</h1>
                <div className="sidebar-reputation">The { this.props.reputation } smuggler</div>
                <div className="sidebar-money">{ this.props.cash } CFA<span className="tooltip">Around ${ (this.props.cash * 0.0017).toFixed(0) }</span></div>

                <div className="sidebar-resources">
                {
                    this.props.resources.map((r, i) => 
                        <React.Fragment key={ i }>
                            <label>{ resString(r.type) }</label>
                            <div className="resource-bg">
                                <div className="resource-bar" style={ {width: Math.min(1, r.count / r.capacity) * 100 + "%"} } />
                            </div>
                        </React.Fragment>
                    )
                }
                </div>
                
                <div className="sidebar-notebook-container">
                    <div className="sidebar-notebook" onClick={ () => { this.props.toggleNotebook(true); } } />
                </div>
                
                {
                    this.props.notebookActive &&
                    <div className="notebook-background" onClick={ () => { this.props.toggleNotebook(false); } }>
                        <div className="notebook-container" onClick={ (e) => { e.stopPropagation(); } }>
                            {
                                !this.state.showMap && this.props.activeMigrants.length > 0 &&
                                <>
                                    <div className="notebook-migrant-bio left" onClick={ () => {this.setState({ showMap: true })} }>
                                        <h2>{ this.props.activeMigrants[0].name }</h2>
                                        <p>{ this.props.activeMigrants[0].nationality }</p>
                                        <p>{ this.props.activeMigrants[0].shortBio }</p>
                                        <p>{ this.props.activeMigrants[0].languages }</p>
                                    </div>
                                    {
                                        this.props.activeMigrants.length > 1 &&
                                        <div className="notebook-migrant-bio right">
                                            <h2>{ this.props.activeMigrants[1].name }</h2>
                                            <p>{ this.props.activeMigrants[1].nationality }</p>
                                            <p>{ this.props.activeMigrants[1].shortBio }</p>
                                            <p>{ this.props.activeMigrants[1].languages }</p>
                                        </div>
                                    }
                                </>

                                ||

                                <div className="notebook-map" onClick={ () => {this.setState({ showMap: false })} }/>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Sidebar;