import * as React from "react";
import { Migrant } from "../utils/types";

interface SidebarProps {
    name: string;
    reputation: string;
    cash: number;

    inverted: boolean;

    activeMigrants: Migrant[];
}

function Sidebar(props: SidebarProps) {
	return (
        <div className={ "sidebar-container" + (props.inverted ? " inverted" : "") }>
            <h1 className="sidebar-name">{ props.name }</h1>
            <div className="sidebar-reputation">The { props.reputation } smuggler</div>
            <div className="sidebar-money">₺{ props.cash }<span className="tooltip">Around ${ (props.cash / 5.31).toFixed(0) }</span></div>
            <div className="sidebar-notebook-container">
                <div className="sidebar-notebook">{ props.activeMigrants.map((migrant) => migrant.name).join("\n") }</div>
            </div>
        </div>
    );
}

export default Sidebar;