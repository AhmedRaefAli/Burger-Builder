const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}


// Reducer  // recives action and update the state
//multiplied compined reducers 
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription //automatic subscribtion triiger after ever reducer change happend  
//passes updated state as props 
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action pass it to reducer 
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
