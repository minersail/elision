import { State, NotebookSection, MigrantState } from "../utils/types";
import { glossary, glossaryPages } from "./state/glossary";
import { AssertionError, notEqual } from "assert";

function flipNotebook(state: State, forwards: boolean): State {
    const activeMigrants = state.migrants.filter(m => m.state === MigrantState.Journeying);

    switch (state.notebook.section) {
        case NotebookSection.Map:
            return {
                ...state,
                notebook: {
                    ...state.notebook,
                    section: forwards ? 
                        (activeMigrants.length > 0 ? NotebookSection.Biography : NotebookSection.Glossary) :
                        NotebookSection.Map,
                }
            }
        case NotebookSection.Biography:
        {
            const atMax = state.notebook.migrantIndex >= Math.ceil(activeMigrants.length / 2) * 2 - 2;
            const atMin = state.notebook.migrantIndex === 0;
            
            return {
                ...state,
                notebook: {
                    ...state.notebook,
                    section: forwards ?
                        (atMax ? NotebookSection.Glossary : NotebookSection.Biography) :
                        (atMin ? NotebookSection.Map : NotebookSection.Biography),
                    migrantIndex: forwards ? 
                        (atMax ? state.notebook.migrantIndex : state.notebook.migrantIndex + 2) :
                        (atMin ? state.notebook.migrantIndex : state.notebook.migrantIndex - 2),
                    glossaryIndex: forwards && atMax ? 0 : state.notebook.glossaryIndex,
                }
            }
        }
        case NotebookSection.Glossary:
        {
            const atMax = state.notebook.glossaryIndex >= Math.ceil(state.notebook.glossaryPages.length / 2) * 2 - 2;
            const atMin = state.notebook.glossaryIndex === 0;
            
            return {
                ...state,
                notebook: {
                    ...state.notebook,
                    section: forwards ? NotebookSection.Glossary :
                        (atMin ? (activeMigrants.length > 0 ? NotebookSection.Biography : NotebookSection.Map) : NotebookSection.Glossary),
                    glossaryIndex: forwards ? 
                        (atMax ? state.notebook.glossaryIndex : state.notebook.glossaryIndex + 2) :
                        (atMin ? state.notebook.glossaryIndex : state.notebook.glossaryIndex - 2),
                    migrantIndex: !forwards && atMin ? Math.floor(activeMigrants.length / 2) * 2 : state.notebook.migrantIndex,
                }
            }
        }
        default:
            return state;
    }
}

function goToDefinition(state: State, key: string): State {
    const glossEntry = glossary.find(g => g.keys.includes(key));

    if (glossEntry === undefined) {
        throw new AssertionError({ message: "goToDefinition called with non-existing key." });
    }

    let pageIndex = 0;
    while (glossEntry.name > glossaryPages[pageIndex].end) {
        pageIndex++;
    }

    return {
        ...state,
        notebook: {
            ...state.notebook,
            active: true,
            section: NotebookSection.Glossary,
            glossaryIndex: Math.floor(pageIndex / 2) * 2,            
        }
    }
}

export { flipNotebook, goToDefinition };