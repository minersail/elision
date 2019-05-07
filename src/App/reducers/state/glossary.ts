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
        definition: "A secondary language spoken (often English or French in Africa) that serves as communication \
        between cultures with different native languages. Often times, bridge languages reflect the colonial past \
        of a country."
    },
    {   
        name: "Hausa",
        keys: ["Hausa"],
        definition: "A popular language in Niger and Nigeria, Hausa is estimated to have 63 million speakers."
    },
    {   
        name: "ECOWAS",
        keys: ["ECOWAS"],
        definition: "The Economic Community of West African States is a union of African countries in which migration \
        is freely allowed without a passport."
    },
    {   
        name: "Muammar al-Ghaddafi",
        keys: ["Ghaddafi"],
        definition: "The leader of Libya for over 40 years, Ghaddafi was an incredibly divisive leader who was seen as \
        both a great uniter and an authoritarian dictator."
    },
    {   
        name: "Tedaga",
        keys: ["Tedaga"],
        definition: "Language spoken by the northern subgroup of the Toubou."
    },
    {   
        name: "Khamsin",
        keys: ["khamsin"],
        definition: "A strong, dust-laden wind that drops the humidity to below 5% for hours at a time."
    },
    {   
        name: "Simoom",
        keys: ["simoom"],
        definition: "Often called \"Poison wind\", the Simoom is a stronger, sudden, shorter version of the Khamsin \
        that raises temperatures to 130F and can cause heat stroke."
    },    
    {   
        name: "Haboob",
        keys: ["haboob"],
        definition: "A massive wind wall of sand, dust and debris that travels at up to 100km an hour."
    },
    {
        name: "2011 Libyan civil war",
        keys: ["Libyan civil war"],
        definition: "Inspired by similar movements in Tunisia and Egypt, Libyan protesters organized an alternative \
        goverment challenging the regime of Muammar al-Gaddafi. It escalated into an eight month conflict, claiming \
        the lives of 20,000, including Gaddafi.",
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