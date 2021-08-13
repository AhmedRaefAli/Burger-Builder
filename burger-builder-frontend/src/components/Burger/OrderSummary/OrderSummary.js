import React , {Component} from 'react';

import Aux from '../../../hoc/Auux/Auux';
import Button from '../../UI/Button/Button';



class OrderSummary extends Component{
        

    render(){

        const ingredientSummary = Object.keys( this.props.ingredients )
        .map( igKey => {
            if(igKey!=="_id"){
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li> );
                }
                else{
                    return null;
                }
        } );

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Cost = {this.props.price.toFixed(2)}$</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>)
    }
} 

export default OrderSummary;