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
                        text: "This is a single event",
                        options: [
                            createEndDialogue("Continue without losing money"),
                            {
                                choiceText: "Lose $100 for no reason",
                                actions: [
                                    {
                                        actionType: JourneyActionType.ModifyCash,
                                        cash: -100,
                                    },
                                    {
                                        actionType: JourneyActionType.EndDialogue,
                                    }
                                ],
                            }
                        ]
                    }
                ]
            },
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "Click yes to go to the next dialogue",
                        options: [
                            {
                                choiceText: "Yes",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1
                                }],
                            },
                            {
                                choiceText: "No",
                                actions: [{
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: 100,
                                }]
                            }
                        ]
                    },
                    {
                        id: 1,
                        text: "Wow you made it to the next dialogue",
                        options: [
                            createEndDialogue("Whoo"),
                        ]
                    }
                ]
            },
        ],
    },
]

export default migrantEvents;