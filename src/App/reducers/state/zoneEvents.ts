import { createEndDialogue, JourneyActionType, ZoneEventPool, ZoneType } from "../../utils/types";

// One pool per migrant
const zoneEvents: ZoneEventPool[] = 
[
    {
        zoneType: ZoneType.Bandit,
        events: [
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "Your caravan is ambushed by a rival smuggling gang.",
                        options: [
                            createEndDialogue("Negotiate."),
                            {
                                choiceText: "Give them $100 to go away.",
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
                        text: "You see a truck, a couple miles away. You are not quite sure what faction its owners belong to, \
                        but the amount of firearms they carry sends a clear message.",
                        options: [
                            {
                                choiceText: "Play it safe.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1
                                }],
                            },
                            createEndDialogue("We don't have time to go around.")
                        ]
                    },
                    {
                        id: 1,
                        text: "The better part of the day is spent navigating around the armed caravan. Eventually, they wander \
                        off and your passengers breathe a sigh of relief.",
                        options: [
                            createEndDialogue("Continue onwards."),
                        ]
                    }
                ]
            },
        ],
    },
    {
        zoneType: ZoneType.Bribery,
        events: [
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "Agadez's officials are used to looking the other way by now. Some say that the bribes are the only \
                        reason the local police force still stands. You approach the nearest customs official, whose face you have\
                        learned to recognize.",
                        options: [
                            {
                                choiceText: "Pay the guard $100.",
                                actions: [
                                    {
                                        actionType: JourneyActionType.ModifyCash,
                                        cash: -100,
                                    },
                                    {
                                        actionType: JourneyActionType.EndDialogue,
                                    }
                                ],
                            },
                            createEndDialogue("Haggle."),
                        ]
                    }
                ]
            }
        ]
    }
]

export default zoneEvents;