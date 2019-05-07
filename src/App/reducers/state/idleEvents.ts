import { createEndDialogue, EventPool } from "../../utils/types";

const idleEvents: EventPool = {
    events: [
        {
            currentDialogueID: 0,
            dialogues: [
                {
                    id: 0,
                    text: "The day passes by uneventfully, spent quietly driving. Perhaps it is a blessing.",
                    options: [
                        createEndDialogue("Continue onwards."),
                    ]
                }
            ]
        },
        {
            currentDialogueID: 0,
            dialogues: [
                {
                    id: 0,
                    text: "The ripples of the dunes look almost serene, betraying its danger and the certain death of any who are lost.",
                    options: [
                        createEndDialogue("Continue onwards."),
                    ]
                }
            ]
        },
    ],
}

export default idleEvents;