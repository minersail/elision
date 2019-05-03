import { GlossaryEntry, GlossaryPage } from "../../utils/types";

const glossary: GlossaryEntry[] = [
    {
        name: "Toubou",
        keys: ["Toubou"],
        definition: "Semi-nomadic ethnic group who control smuggling routes in Chad, Niger, and Libya."
    },
    {   
        name: "Tuareg",
        keys: ["Tuareg"],
        definition: "Semi-nomadic ethnic group who control smuggling routes in Mali, Niger, and Libya."
    },
    {   
        name: "Bridge language",
        keys: ["bridge language"],
        definition: "Semi-nomadic ethnic group who control smuggling routes in Mali, Niger, and Libya."
    },
    {   
        name: "Hausa",
        keys: ["Hausa"],
        definition: "Semi-nomadic ethnic group who control smuggling routes in Mali, Niger, and Libya."
    },
    {   
        name: "ECOWAS",
        keys: ["ECOWAS"],
        definition: "Semi-nomadic ethnic group who control smuggling routes in Mali, Niger, and Libya."
    },
    {   
        name: "Ghaddafi",
        keys: ["Ghaddafi"],
        definition: "Semi-nomadic ethnic group who control smuggling routes in Mali, Niger, and Libya."
    },
    {   
        name: "Tegada",
        keys: ["Tegada"],
        definition: "Semi-nomadic ethnic group who control smuggling routes in Mali, Niger, and Libya."
    }
];
glossary.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));

function generatePages(gloss: GlossaryEntry[]): GlossaryPage[] {
    const pages: GlossaryPage[] = [];
    let runningLength = 0;
    let currentStart = "";

    for (const entry of gloss) {
        if (currentStart === "") {
            currentStart = entry.name;
        }

        runningLength += entry.definition.length;

        if (runningLength > 200) {
            runningLength = 0;
            pages.push({
                start: currentStart,
                end: entry.name,
            });
            currentStart = "";
        }
    }

    if (runningLength !== 0) {        
        pages.push({
            start: currentStart,
            end: gloss[gloss.length - 1].name,
        });
    }

    return pages;
}

const glossaryPages = generatePages(glossary);

export { glossary, glossaryPages };