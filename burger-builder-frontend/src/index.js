import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore ,combineReducers , applyMiddleware, compose } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilderRducer';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/Auth';
import thunk from 'redux-thunk';


//for redux dev tool 
const composeEnhancers = process.env.NODE_ENV ==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;

//to combine more reducer to one root reducer and use it with store 
//not in container we try to access => ing : state.abc.ingredients 
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth:authReducer
});


// const logger = (store)=>{
//     return next =>{
//         return action =>{
//             console.log("[MiddleWare] Dispatching" , action);
//             const result = next (action);
//             console.log("[MiddleWare] Next State" , store.getState());
//             return result;
//         }
//     }
// }

const store = createStore (rootReducer , composeEnhancers( applyMiddleware(/*logger,*/ thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter basename = "BurgerBuilder">
            <App/>
        </BrowserRouter>
    </Provider>  
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
