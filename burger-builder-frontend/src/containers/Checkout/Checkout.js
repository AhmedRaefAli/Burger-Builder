import React, { Component } from 'react';
import { Route, Redirect ,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummry/CheckoutSummry';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        
        this.props.history.replace('/checkout/Contact-Data');
    }

    render () {
        
        let summary = <Redirect to="/" />
        if ( this.props.ings ) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        CancelButton={this.checkoutCancelledHandler}
                        ContinueButton={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path+'/Contact-Data'}> <ContactData ingredients= {this.props.ings} price = {this.props.Tprice}/> </Route>
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        Tprice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};

const abc= withRouter(Checkout);
export default connect( mapStateToProps )( abc );
