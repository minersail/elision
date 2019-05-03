import { State, NotebookSection, MigrantState } from "../utils/types";

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
                }
            }
        }
        default:
            return state;
    }
}

export { flipNotebook };