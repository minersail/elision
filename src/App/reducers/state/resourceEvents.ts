import { createEndDialogue, ResourceEventPool, Resource, JourneyActionType, JourneySpeed } from "../../utils/types";

const resourceEvents: ResourceEventPool[] = [
    {
        resourceType: Resource.Gas,
        initialEventCompleted: false,
        initialEvent: {
            currentDialogueID: 0,
            dialogues: [
                {
                    id: 0,
                    text: "Your car's engine starts to peter out, and you have the gut-wrenching realization that your worst fear has \
                    come true - you are stuck in the Sahara.",
                    options: [
                        {
                            choiceText: "Continue the journey on foot.",
                            actions: [
                                {
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1,
                                }
                            ],
                        },
                        {
                            choiceText: "Wait and hope someone finds you.",                                
                            actions: [
                                {
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 2,
                                }
                            ]
                        }
                    ]
                },                    
                {
                    id: 1,
                    text: "You and your passengers attempt to make the rest of the journey on foot. You know walking is a foolhardy attempt \
                    to deny an almost certainly lethal fate, but it's the best choice you have left.",
                    options: [
                        {
                            choiceText: "Continue onwards.",
                            actions: [
                                {
                                    actionType: JourneyActionType.SwitchSpeed,
                                    speed: JourneySpeed.Walking,
                                },                                    
                                {
                                    actionType: JourneyActionType.EndDialogue,
                                }
                            ]
                        }
                    ],
                },                    
                {
                    id: 2,
                    text: "You wait in the car, telling your passengers their best hope is to wait for another smuggler to come along. \
                    Your passengers look slightly reassured, but knowing your fellow smugglers, you are pessimistic about being saved \
                    even if you are found.",
                    options: [
                        {
                            choiceText: "Continue onwards.",
                            actions: [
                                {
                                    actionType: JourneyActionType.SwitchSpeed,
                                    speed: JourneySpeed.Stopped,
                                },                                    
                                {
                                    actionType: JourneyActionType.EndDialogue,
                                }
                            ]
                        }
                    ]
                }
            ],
        },
        events: [
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "A van approaches, and its driver stops and beckons you over. Away from your passengers, he whispers that \
                        he has room for one. Looking back at your jeep, you solemnly understand that the rest will be doomed to die.",
                        options: [
                            {
                                choiceText: "Accept his offer.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1,
                                }]
                            },                            
                            {
                                choiceText: "Let one of your passengers continue.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 2,
                                }]
                            },                        
                            {
                                choiceText: "Decline his offer.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 3,
                                }]
                            },
                        ]
                    },
                    {
                        id: 1,
                        text: "You grab your money and some water, then climb into the van. MIGRANT realizes what is happening, and runs \
                        after the van - but it is too late. As you sit in the backseat on the way to your next city, you try not to think \
                        of people you abandoned to die.",
                        options: [
                            {
                                choiceText: "Continue onwards.",
                                actions: [{
                                    actionType: JourneyActionType.LoseAllMigrants,
                                },{
                                    actionType: JourneyActionType.MoveToCity,
                                }]
                            }
                        ],
                    },
                    {
                        id: 2,
                        text: "You motion to MIGRANT, give them all your money, and tell them that they will be making the rest of the \
                        journey with a different driver. They stare at you open-eyed, stuttering their gratitudes, before they are quickly \
                        ushered into their new transportation. You watch them disappear over the horizon, then sit back to survey the desert.",
                        options: [
                            {
                                choiceText: "Accept your fate.",
                                actions: [{
                                    actionType: JourneyActionType.LoseGame,
                                }],
                            }
                        ],
                    },
                    {
                        id: 2,
                        text: "You respectfully decline his offer, telling him that you cannot leave anyone in the Sahara. The driver \
                        nods, then gets back in his van and drives off.",
                        options: [
                            createEndDialogue("Continue onwards."),
                        ],
                    }
                ]
            },
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "You see a caravan in the distance, moving slowly towards the horizon.",
                        options: [
                            {
                                choiceText: "Flag it down.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1,
                                }]
                            },                            
                            {
                                choiceText: "Let it pass by.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 2,
                                }]
                            },
                        ]
                    },
                    {
                        id: 1,
                        text: "The caravan stops, and one of the drivers gets out. While you do not share a language, he recognizes \
                        that being stuck in the Sahara is a death sentence. He manages to spare you half a days' worth of gas, then \
                        proceeds to return to his caravan.",
                        options: [
                            {
                                choiceText: "Thank him, and continue.",
                                actions: [{
                                    actionType: JourneyActionType.ModifyGas,
                                    gas: 16,
                                },{
                                    actionType: JourneyActionType.SwitchSpeed,
                                    speed: JourneySpeed.Driving,
                                },{
                                    actionType: JourneyActionType.ResetResourceEvent,
                                    resource: Resource.Gas,
                                },{
                                    actionType: JourneyActionType.EndDialogue,
                                }]
                            }
                        ],
                    },
                    {
                        id: 2,
                        text: "You feel conflicted as you watch the caravan pass over the horizon. While nothing terrible happened, you might \
                        not have another chance to find other travelers.",
                        options: [
                            createEndDialogue("Continue onwards."),
                        ],
                    }
                ]
            },
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "A jeep comes by, and you try to flag it down desparately. The driver slows briefly as if considering helping, \
                        but then shouts something lost to the wind and speeds off. You slump back, disappointed but not suprised.",
                        options: [
                            createEndDialogue("Continue onwards."),
                        ]
                    },
                ]
            },
        ],
    },
    {        
        resourceType: Resource.Water,
        initialEventCompleted: false,
        initialEvent: {
            currentDialogueID: 0,
            dialogues: [
                {
                    id: 0,
                    text: "You put your last gallon of water to your lips. You greedily lap up the last drops, knowing you might not have any \
                    more water in a long while.",
                    options: [
                        createEndDialogue("Continue onwards."),
                    ]
                }
            ]
        },
        events: [
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "MIGRANT has fainted. You look back and notice that they are still breathing, but it is very shallow. You shake \
                        your sleepiness off, keenly aware that without water you may be next.",
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
                        text: "You hear a slump from the back, and twist your head around. MIGRANT has keeled over, and you rush to check their heartbeat. \
                        After a grim ten seconds, you acknowledge that acute dehydration has claimed their life. Disheartened, you decide what to do next.",
                        options: [
                            {
                                choiceText: "Leave the body in the Sahara.",
                                actions: [
                                    {
                                        actionType: JourneyActionType.GoToDialogue,
                                        dialogueId: 1,
                                    }
                                ],
                            },                            
                            {
                                choiceText: "Allocate money for a burial in the next city.",
                                actions: [
                                    {
                                        actionType: JourneyActionType.GoToDialogue,
                                        dialogueId: 2,
                                    }
                                ],
                            }
                        ]
                    },                   
                    {
                        id: 1,
                        text: "You leave the body behind to be one of the thousands never found.",
                        options: [
                            {
                                choiceText: "Continue onwards.",
                                actions: [
                                    {
                                        actionType: JourneyActionType.LoseMigrant,
                                        migrantId: -1, // Use -1 to signify replacement
                                    },                                    
                                    {
                                        actionType: JourneyActionType.EndDialogue,
                                    }
                                ]
                            }
                        ],
                    },                    
                    {
                        id: 2,
                        text: "You close MIGRANT's eyes, then quickly press onwards, knowing that their fate may soon become reality for the rest of the caravan.",
                        options: [
                            {
                                choiceText: "Continue onwards.",
                                actions: [
                                    {
                                        actionType: JourneyActionType.ModifyCash,
                                        cash: -10000,
                                    },                            
                                    {
                                        actionType: JourneyActionType.LoseMigrant,
                                        migrantId: -1, // Use -1 to signify replacement
                                    },                                    
                                    {
                                        actionType: JourneyActionType.EndDialogue,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
        ],
    }
]

export default resourceEvents;