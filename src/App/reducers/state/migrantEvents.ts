import { createEndDialogue, JourneyActionType, MigrantEventPool } from "../../utils/types";

// One pool per migrant
const migrantEvents: MigrantEventPool[] = 
[
    {
        poolIndex: 0,
        migrantID: 0,
        events: [
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "Ojeomokhai looks off into the distance, lost in thought, a crease in his eyebrows betraying his otherwise indiscernable worry.",
                        options: [
                            createEndDialogue("Leave him be."),
                            {
                                choiceText: "Ask him what is on his mind.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1,
                                }]
                            }
                        ],
                    },                    
                    {
                        id: 1,
                        text: "Ojeomokhai explains how he sold his house to afford this journey. For him, this is a one-way trip.",
                        options: [
                            {
                                choiceText: "Tell him his road ahead will be brighter.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 3,
                                }]
                            },
                            {
                                choiceText: "Offer him $100 for the road forward",
                                actions: [{
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: -100,
                                },
                                {
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 2,
                                }]
                            }
                        ],
                    },                                        
                    {
                        id: 2,
                        text: "Ojeomokhai gives you a small smile and offers his thanks - although not much, it will help him if he runs into \
                        unexpected troubles.",
                        options: [
                            createEndDialogue("Continue onwards."),
                        ],
                    },                                   
                    {
                        id: 3,
                        text: "Ojeomokhai gives you a faint smile, then turns back to stare into the dunes. You're unsure whether your words \
                        offered comfort or if his smile was an act of him putting his mask back on.",
                        options: [
                            createEndDialogue("Continue onwards."),
                        ],
                    }
                ],
            },
        ],
    },
    {
        poolIndex: 0,
        migrantID: 1,
        events: [
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "You hear a loud yelp from the back - Gloria exclaims that some of her books are missing. She believes that \
                        they fell out of the bags piled up next to the window during the last bumpy hour.",
                        options: [
                            {
                                choiceText: "Her books are gone, lost in the Sahara.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1,
                                }]
                            },
                            {
                                choiceText: "Circle back and attempt to find them.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 3,
                                }]
                            }
                        ],
                    },                    
                    {
                        id: 1,
                        text: "Gloria begs you to stop - these books were borrowed from her town's doctor, and critical to passing her \
                        entrance exam.",
                        options: [
                            {
                                choiceText: "You cannot afford to lose time.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 2,
                                }]
                            },
                            {
                                choiceText: "Circle back and attempt to find them.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 3,
                                }]
                            }
                        ],
                    },
                    {
                        id: 2,
                        text: "Gloria looks out the back window, dejected. Her loss is a tragedy, but time and resources are not luxuries \
                        for those in the desert.",
                        options: [
                            createEndDialogue("Continue onwards."),
                        ],
                    }, 
                    {
                        id: 3,
                        text: "You turn around and backtrack through the endless desert. After a couple hours' time, you find most of the \
                        books.",
                        options: [
                            createEndDialogue("TODO: move day forward and subtract resources"),
                            {
                                choiceText: "Demand that she pay you for lost time.",
                                actions: [{
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: 50,
                                },
                                {
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 4,  
                                }]
                            }
                        ],
                    }, 
                    {
                        id: 4,
                        text: "Gloria begins to argue, but her voice slowly peters out as she eyes your gun. Reluctantly, she hands over the \
                        money, realizing that she cannot argue with the person who controls her fate.",
                        options: [
                            createEndDialogue("Continue onwards."),
                        ],
                    },
                ],
            },
        ],
    },
    {
        poolIndex: 0,
        migrantID: 2,
        events: [
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "Calvin says hi.",
                        options: [
                            createEndDialogue("Say hi back."),
                        ],
                    }, 
                ],
            },
        ],
    },
]

export default migrantEvents;