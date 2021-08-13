import React , {Component} from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import axios from '../../axiosInstance';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class order extends Component{

    componentDidMount(){
        
        this.props.onFetchOrders(this.props.userID,this.props.token);
    }


    render(){
        let orders = <Spinner />;
        if ( !this.props.loading ) {
            orders = this.props.orders.map( order => (
                
                <Order
                key={order.id}
                totalPrice={+order.totalPrice}
                delivaryMethod={order.delivaryMethod}
                customer={order.customer}
                ingredients={order.ingredients} />
            ) )
        }
        return(
            <div>   
                {orders}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        userID: state.auth.userId,
        token:state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (userID,token) => dispatch( actions.fetchOrders(userID,token) )
    };
};

const WROrder = withRouter(order);

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler(WROrder,axios) );

