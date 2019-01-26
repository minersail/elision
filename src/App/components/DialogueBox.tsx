import * as React from "react";

interface DialogueBoxProps {
	dialogue: string;
	next: () => void;
}

function DialogueBox(props: DialogueBoxProps) {
	return (
	<div className="dialogue">
		<div className="dialogueBox">
			{props.dialogue}
			<span className="dialogueNext" onClick={props.next}>▷</span>
		</div>
	</div>);
}

export default DialogueBox;
