import React, { Component } from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/Buildcontrols/Buildcontrols';
import Mooodal from '../../components/UI/Moodal/Moodal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axiosInstance from '../../axiosInstance';
import Auux from '../../hoc/Auux/Auux';
import  {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount(){   
        this.props.onInitIngs();         
    }

    
    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                if (ingredients[igKey]!=="60f7c19f6128e81990fba77e"){
                return ingredients[igKey];}
                else{return 0;}
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    
    purchaseHandler = () => {
        if (this.props.isAuthenticated){
            this.setState( { purchasing: true } );
        }else{
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
        }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }


    render () {

        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    
        if ( this.props.ings ) {
            burger = (
                <Auux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price} />
                </Auux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        
        
        return (
            <Auux>
                <Mooodal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Mooodal>
                {burger}
            </Auux>
        );
    }
}


//center store pass state as props 
const mapStateToProps = state => {
    
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error : state.error,
        isAuthenticated: state.auth.token !==null
    };
}

//component dispatch action 
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(action.addIngredient( ingName)),
        onIngredientRemoved: (ingName) => dispatch((action.removeIngredient( ingName))),
        onInitIngs: () => dispatch(action.initIngredients()),
        onInitPurchase: () => dispatch(action.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(action.setAuthRedirectPath(path))
    }
}


const WRBurger = withRouter(BurgerBuilder);
const WEHBurger = withErrorHandler(WRBurger,axiosInstance);
export default connect(mapStateToProps,mapDispatchToProps)(WEHBurger);
