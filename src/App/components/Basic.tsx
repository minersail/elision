import * as React from "react";

interface BasicProps {
	info: string;
}

function Basic(props: BasicProps) {
	return <p>{props.info}</p>;
}

export default Basic;
