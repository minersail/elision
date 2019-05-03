import * as React from "react";
import { glossary } from "../reducers/state/glossary";

function generateLinks(text: string, goToDefinition: (key: string) => void): JSX.Element {
    const separatorRegex = new RegExp(glossary.map(g => g.keys.join("|")).join("|"), "g");    
    const glossaryHits = text.match(separatorRegex);

    if (glossaryHits === null) {
        return (<>{ text }</>);
    }

    const glossaryJSX = glossaryHits.map((x, i) => (<React.Fragment key={ i }>{ 
        <span className="definition" onClick={ () => { goToDefinition(x); } }>{ x }</span> 
    }</React.Fragment>));
    const textChunks = text.split(separatorRegex);

    return (
        <>
        {
            textChunks.flatMap((v, i) => i >= glossaryJSX.length ? [v] : [v, glossaryJSX[i]])
        }
        </>
    );
}

export default generateLinks;