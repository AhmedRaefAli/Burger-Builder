import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

export const purchaseBurgerSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderDataaaa ,token) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() );
        
        axios.post( 'http://localhost:8080/order/make-order', orderDataaaa ,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        } )
        .then( response => {
        dispatch( purchaseBurgerSuccess( response.data.order.customer, orderDataaaa ) );
        } )
        .catch( error => {
            dispatch( purchaseBurgerFail( error ) );
        } );
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (userID , token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.post( 'http://localhost:8080/order/get-orders',{userID:userID},
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        } )
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data.orders ) {
                    fetchedOrders.push( {
                        ...res.data.orders[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};