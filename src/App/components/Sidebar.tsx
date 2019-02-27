import * as React from "react";

interface SidebarProps {
    name: string;
    reputation: string;
    cash: number;

    inverted: boolean;
}

function Sidebar(props: SidebarProps) {
	return (
        <div className={ "sidebar-container" + (props.inverted ? " inverted" : "") }>
            <h1 className="sidebar-name">{ props.name }</h1>
            <div className="sidebar-reputation">The { props.reputation } smuggler</div>
            <div className="sidebar-money">${ props.cash }</div>
            <div className="sidebar-notebook-container">
                <div className="sidebar-notebook" />
            </div>
        </div>
    );
}

export default Sidebar;