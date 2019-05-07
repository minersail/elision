import { createEndDialogue, JourneyActionType, ZoneEventPool, ZoneType } from "../../utils/types";
import { BRIBE_MONEY } from "../../utils/constants";

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
                        text: "Your caravan is ambushed by a smuggling gang. While the group is very young, perhaps even teenage, \
                        their weaponry says more than their age ever could.",
                        options: [
                            {
                                choiceText: "Negotiate.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1,
                                }],
                            },
                            {
                                choiceText: "Give in to their demands.",
                                actions: [{
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: -1000,
                                },{
                                    actionType: JourneyActionType.ModifyGas,
                                    gas: -10,
                                },{
                                    actionType: JourneyActionType.ModifyWater,
                                    water: -5,
                                },{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 2,
                                }],
                            }
                        ]
                    },
                    {
                        id: 1,
                        text: "You confront them, telling them that you will not give them more than half the supplies they have \
                        demanded without a fight. The youth eye each other for a tense second, before agreeing to your conditions and \
                        heading off.",
                        options: [
                            {
                                choiceText: "Breathe a sigh of relief.",
                                actions: [{
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: -500,
                                },{
                                    actionType: JourneyActionType.ModifyGas,
                                    gas: -5,
                                },{
                                    actionType: JourneyActionType.ModifyWater,
                                    water: -2,
                                },{
                                    actionType: JourneyActionType.EndDialogue,
                                }],
                            }
                        ]
                    },
                    {
                        id: 2,
                        text: "The youth siphon some of your gas and take some of your money and water. As they gleefully speed \
                        off, you notice their mountain of pilfered goods and wonder how they can afford to steal for fun.",
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
                        text: "You see a truck, a couple miles away. You are not quite sure what faction its owners belong to, \
                        but the amount of firearms they carry sends a clear message.",
                        options: [
                            {
                                choiceText: "Play it safe.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1,
                                }],
                            },
                            {
                                choiceText: "We don't have time to go around.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 2,
                                }],
                            },
                        ]
                    },
                    {
                        id: 1,
                        text: "The better part of the day is spent navigating around the armed caravan. Eventually, they wander \
                        off and your passengers breathe a sigh of relief.",
                        options: [
                            {
                                choiceText: "Continue onwards",
                                actions: [{
                                    actionType: JourneyActionType.NegateTravel,
                                }, {
                                    actionType: JourneyActionType.EndDialogue,
                                }]
                            }
                        ]
                    },
                    {
                        id: 2,
                        text: "You come within a hundred meters of the other caravan, and prepare for the worst. However, they breeze \
                        by you, not even giving you a second thought - they must be smugglers headed to Agadez from Libya.",
                        options: [
                            createEndDialogue("Breathe a sigh of relief."),
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
                        text: "You stop at a routine checkpoint and pull out the necessary bribery funds to proceed.",
                        options: [
                            {
                                choiceText: `Pay the guard ${ BRIBE_MONEY } CFA.`,
                                actions: [{
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: -BRIBE_MONEY,
                                },{
                                    actionType: JourneyActionType.EndDialogue,
                                }],
                            },
                        ]
                    },
                ],
            },
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "The customs officials are used to looking the other way by now. Some say that the bribes are the only \
                        reason the local police force still stands. You approach the nearest official, whose face you have learned \
                        to recognize.",
                        options: [
                            {
                                choiceText: `Pay the guard ${ BRIBE_MONEY } CFA.`,
                                actions: [{
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: -BRIBE_MONEY,
                                },{
                                    actionType: JourneyActionType.EndDialogue,
                                }],
                            },{
                                choiceText: "Haggle.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1,
                                }],
                            },
                        ]
                    },                    
                    {
                        id: 1,
                        text: "The officer shakes his head, and says the price is non-negotiable because of the current budget \
                        cuts. You sympathize a little, knowing that this bribe might be a weeks' pay for him.",
                        options: [
                            {
                                choiceText: "Pay the guard the money.",
                                actions: [{
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: -BRIBE_MONEY,
                                },{
                                    actionType: JourneyActionType.EndDialogue,
                                }],
                            },
                            {
                                choiceText: "Pay him a little extra.",
                                actions: [{
                                    actionType: JourneyActionType.ModifyCash,
                                    cash: -BRIBE_MONEY * 1.2,
                                },{
                                    actionType: JourneyActionType.EndDialogue,
                                }],
                            },
                        ]
                    }
                ]
            }
        ]
    },
    {
        zoneType: ZoneType.NaturalDisaster,
        events: [
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "A massive haboob approaches in the distance. You estimate it will find you in the next hour.",
                        options: [                            
                            {
                                choiceText: "Stop and wait it out.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1,
                                }],
                            },
                            {
                                choiceText: "Continue into the storm.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 2,
                                }],
                            }
                        ],
                    },                    
                    {
                        id: 1,
                        text: "The haboob hits like a blast, but after an hour, it is clear enough to proceed.",
                        options: [
                            createEndDialogue("Continue onwards."),
                        ],
                    },
                    {
                        id: 2,
                        text: "You get lost in a maelstrom of sand so thick you cannot see. When the dust clears, you realize \
                        that you went in the entirely wrong direction.",
                        options: [                            
                            {
                                choiceText: "Continue onwards.",
                                actions: [{
                                    actionType: JourneyActionType.ModifyDistance,
                                    distance: -100,
                                },{
                                    actionType: JourneyActionType.EndDialogue,
                                }],
                            },
                        ],
                    }
                ]
            },
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "The air suddenly gets incredibly dry, and you look around to see that you are enveloped in a large \
                        yellow haze. You are in the middle of the khamsin, and it will be hours before it passes.",
                        options: [                            
                            {
                                choiceText: "Stop and wait it out.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 1,
                                }],
                            },
                            {
                                choiceText: "Continue into the storm.",
                                actions: [{
                                    actionType: JourneyActionType.GoToDialogue,
                                    dialogueId: 2,
                                }],
                            }
                        ],
                    },                    
                    {
                        id: 1,
                        text: "You come to a stop, and watch as the sand hurtles by. You have consumed much more water than normal \
                        to keep up with the extremely dehydrating air.",
                        options: [
                            {
                                choiceText: "Continue onwards.",
                                actions: [{
                                    actionType: JourneyActionType.ModifyWater,
                                    water: -2,
                                },{
                                    actionType: JourneyActionType.NegateTravel,
                                },{
                                    actionType: JourneyActionType.EndDialogue,
                                }],
                            }
                        ],
                    },
                    {
                        id: 2,
                        text: "You proceed through the storm slowly but surely, making sure you hydrate extra to compensate for the \
                        arid environment.",
                        options: [                            
                            {
                                choiceText: "Continue onwards.",
                                actions: [{
                                    actionType: JourneyActionType.ModifyWater,
                                    water: -2,
                                },{
                                    actionType: JourneyActionType.EndDialogue,
                                }],
                            },
                        ],
                    }
                ]
            },
            {
                currentDialogueID: 0,
                dialogues: [
                    {
                        id: 0,
                        text: "You feel the temperature rise dramatically, and suddenly a wave of dust hits, contaminating the bottles \
                        of water currently open.",
                        options: [
                            {
                                choiceText: "Toss them and continue.",
                                actions: [{
                                    actionType: JourneyActionType.ModifyWater,
                                    water: -4,
                                },{
                                    actionType: JourneyActionType.EndDialogue,
                                }],
                            }
                        ]
                    }
                ]
            }
        ],
    }
]

export default zoneEvents;