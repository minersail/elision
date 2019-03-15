import { createEndDialogue, JourneyActionType, EventPool } from "../../utils/types";

const idleEvents: EventPool = {
    events: [
        {
            currentDialogueID: 0,
            dialogues: [
                {
                    id: 0,
                    text: "Wow you found $20",
                    options: [
                        {
                            choiceText: "Wow thanks",
                            actions: [
                                {
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: 20,
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
                    text: "Uh oh you lost $20",
                    options: [
                        {
                            choiceText: "What no",
                            actions: [
                                {
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: -20,
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
    ],
}

export default idleEvents;