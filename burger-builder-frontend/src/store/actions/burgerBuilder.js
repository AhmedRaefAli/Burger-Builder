import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

export const addIngredient = (ingName)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:ingName
    };
};

export const removeIngredient = (ingName)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingName
    };
};

export const setIngredients = ( ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};


export const initIngredients = () => {
    return dispatch => {
        axios.get('http://localhost:8080/ings/get-ingredients')
            .then( response => {
                dispatch(setIngredients(response.data.ings[0]));
            } )
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            } );
    };
};