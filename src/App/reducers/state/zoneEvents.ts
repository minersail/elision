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
                            createEndDialogue("Speed away"),
                            {
                                choiceText: "Give them $100 to go away",
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
                        text: "Something about terrorists",
                        options: [
                            {
                                choiceText: "Say hi",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1
                                }],
                            }
                        ]
                    },
                    {
                        id: 1,
                        text: "You say hi",
                        options: [
                            createEndDialogue("Continue"),
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
                        text: "You pay the guard",
                        options: [
                            {
                                choiceText: "Pay guard",
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
            }
        ]
    }
]

export default zoneEvents;