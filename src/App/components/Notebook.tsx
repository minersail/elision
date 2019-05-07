import * as React from "react";
import { Migrant, NotebookData, NotebookSection, CityData, JourneyData, GameScreen } from "../utils/types";
import Map from "./Map";

interface NotebookProps {
    notebook: NotebookData;
    activeMigrants: Migrant[];
    
    currentCity: CityData;
    journeyData: JourneyData;
    gameScreen: GameScreen;
    
    toggleNotebook: (enable: boolean) => void;
    flipNotebook: (forwards: boolean) => void;
    zoomMap: (zoomIn: boolean) => void;
}

function Notebook(props: NotebookProps) {
    return (
        <div className="notebook-background" onClick={ () => { props.toggleNotebook(false); } }>
            <div className="notebook-container" onClick={ (e) => { e.stopPropagation(); } }>
                {
                    props.notebook.section === NotebookSection.Map &&
                    <Map flipNotebook={ props.flipNotebook } zoomMap={ props.zoomMap }
                    zoomedOut={ props.notebook.mapZoomed } currentCity={ props.currentCity } journeyData={ props.journeyData } gameScreen={ props.gameScreen } />

                    ||

                    props.notebook.section === NotebookSection.Biography &&
                    <>
                        <div className="notebook-page left" onClick={ () => { props.flipNotebook(false); }}>
                            <div className="notebook-bio-header">
                                <h2>{ props.activeMigrants[props.notebook.migrantIndex].name }</h2>
                                <p>{ props.activeMigrants[props.notebook.migrantIndex].nationality }</p>
                                <p>Speaks { props.activeMigrants[props.notebook.migrantIndex].languages.slice(0, -1).join(", ") + 
                                (props.activeMigrants[props.notebook.migrantIndex].languages.length > 1 ? " and " : "") + 
                                props.activeMigrants[props.notebook.migrantIndex].languages.slice(-1).pop() }</p>
                            </div>
                            <p>{ props.activeMigrants[props.notebook.migrantIndex].shortBio }</p>
                        </div>
                        <div className="notebook-page right" onClick={ () => { props.flipNotebook(true); }}>
                        {
                            props.notebook.migrantIndex !== props.activeMigrants.length - 1 &&
                            <>
                            <div className="notebook-bio-header">
                                <h2>{ props.activeMigrants[props.notebook.migrantIndex + 1].name }</h2>
                                <p>{ props.activeMigrants[props.notebook.migrantIndex + 1].nationality }</p>
                                <p>Speaks { props.activeMigrants[props.notebook.migrantIndex + 1].languages.slice(0, -1).join(", ") + 
                                (props.activeMigrants[props.notebook.migrantIndex + 1].languages.length > 1 ? " and " : "") + 
                                props.activeMigrants[props.notebook.migrantIndex + 1].languages.slice(-1).pop() }</p>
                            </div>
                            <p>{ props.activeMigrants[props.notebook.migrantIndex + 1].shortBio }</p>
                            </>
                        }
                        </div>
                    </>

                    ||

                    props.notebook.section === NotebookSection.Glossary &&
                    <>
                        <div className="notebook-page glossary left" onClick={ () => { props.flipNotebook(false); }}>
                        {
                            props.notebook.glossary.filter(g => 
                                g.name >= props.notebook.glossaryPages[props.notebook.glossaryIndex].start &&
                                g.name <= props.notebook.glossaryPages[props.notebook.glossaryIndex].end).map((g, i) =>
                                <div key={ i }>         
                                    <h2>{ g.name }</h2>
                                    <p>{ g.definition }</p>
                                </div>)
                        }
                        </div>
                        <div className="notebook-page glossary right" onClick={ () => { props.flipNotebook(true); }}>
                        {
                            props.notebook.glossaryIndex !== props.notebook.glossaryPages.length - 1 &&
                            props.notebook.glossary.filter(g => 
                                g.name >= props.notebook.glossaryPages[props.notebook.glossaryIndex + 1].start &&
                                g.name <= props.notebook.glossaryPages[props.notebook.glossaryIndex + 1].end).map((g, i) =>
                                <div key={ i }>
                                    <h2>{ g.name }</h2>
                                    <p>{ g.definition }</p>
                                </div>)
                        }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Notebook;