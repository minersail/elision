import * as React from "react";
import { CityHubType, Resource, ResourceUnit, resString } from "../utils/types";
import { AssertionError } from "assert";

interface ShopHubProps {
    hubName: string;
    resources: ResourceUnit[];
    prices: Map<Resource, number>;

    switchHub: (hubType: CityHubType) => void;
    purchaseItem: (resource: Resource, amount: number, price: number) => void;
}

interface ShopHubState {
    selectedItem: Resource | null;
}

class ShopHub extends React.Component<ShopHubProps, ShopHubState> {
    public constructor(props: ShopHubProps) {
        super(props);
        this.state = {
            selectedItem: null,
        }
    }

    public render() {
        const item = this.props.resources.find(res => res.type === this.state.selectedItem);
        const price = (item !== undefined ? this.props.prices.get(item.type) : 0) || 0;

        return (
            <div className="city-container">
                <h1 className="city-title">{ this.props.hubName }</h1>
                <div className="info-container">                 
                    {
                        item === undefined &&
                        <>
                            <div className="info">The market is a mild din full of bargaining and haggling. One of the local shopkeeps beams at your presence,
                            knowing that you always buy in bulk.</div>
                            <div className="info-choice-container">
                                <button className="info-choice" onClick={ () => { this.props.switchHub(CityHubType.None) } }>Return to the city</button>
                            </div>
                        </>
                        ||                        
                        item !== undefined &&
                        <>
                            <div className="info">The shopkeep is selling { resString(item.type).toLowerCase() }, 
                            each liter costing { price } CFA. </div>
                            <div className="info-choice-container">
                                <button className="info-choice" onClick={ () => { this.props.purchaseItem(item.type, 1, price); } }>Purchase 1</button>
                                <button className="info-choice" onClick={ () => { this.props.purchaseItem(item.type, 5, price); } }>Purchase 5</button>
                                <button className="info-choice" onClick={ () => { this.setState({...this.state, selectedItem: null}) } }>Browse other wares</button>
                            </div>
                        </>                     
                    }
                </div>
                {
                    item === undefined &&
                    <div className="shop-container">
                        {                    
                            this.props.resources.map((res, i) => 
                                <button onClick={ () => { this.setState({...this.state, selectedItem: res.type}) } } key={ i }>
                                    { resString(res.type) }
                                </button>
                            )
                        }
                    </div>
                }
            </div>
        );
    }
}

export default ShopHub;