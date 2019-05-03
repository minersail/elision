import * as React from "react";
import { Migrant, ResourceUnit, resString, NotebookData, CityData, JourneyData, GameScreen } from "../utils/types";
import Notebook from './Notebook';

interface SidebarProps {
    gameScreen: GameScreen;

    name: string;
    reputation: string;
    cash: number;
    resources: ResourceUnit[];

    inverted: boolean;

    activeMigrants: Migrant[];
    notebook: NotebookData;

    currentCity: CityData;
    journeyData: JourneyData;

    toggleNotebook: (enable: boolean) => void;
    flipNotebook: (forwards: boolean) => void;
    goToDefinition: (key: string) => void;
}

function Sidebar(props: SidebarProps) {
    return (
        <div className={ "sidebar-container" + (props.inverted ? " inverted" : "") }>
            <h1 className="sidebar-name">{ props.name }</h1>
            <div className="sidebar-reputation">The { props.reputation } smuggler</div>
            <div className="sidebar-money">{ props.cash } CFA<span className="tooltip">Around ${ (props.cash * 0.0017).toFixed(0) }</span></div>

            <div className="sidebar-resources">
            {
                props.resources.map((r, i) => 
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
                <div className="sidebar-notebook" onClick={ () => { props.toggleNotebook(true); } } />
            </div>
            
            {
                props.notebook.active &&
                <Notebook notebook={ props.notebook } activeMigrants={ props.activeMigrants }
                currentCity={ props.currentCity } journeyData={ props.journeyData } gameScreen={ props.gameScreen }
                toggleNotebook={ props.toggleNotebook } flipNotebook={ props.flipNotebook } />
            }
        </div>
    );
}

export default Sidebar;