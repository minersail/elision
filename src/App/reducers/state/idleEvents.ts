import { createEndDialogue, JourneyActionType, EventPool } from "../../utils/types";

const idleEvents: EventPool = {
    events: [
        {
            currentDialogueID: 0,
            dialogues: [
                {
                    id: 0,
                    text: "The day is unevenful, spent quietly driving. Perhaps it is a blessing.",
                    options: [
                        {
                            choiceText: "Continue onwards.",
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
    ],
}

export default idleEvents;