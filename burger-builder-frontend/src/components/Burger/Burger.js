import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';

const burger = (props)=>{

    let transformedIngredients = Object.keys( props.ingredients )//covert object to array 
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {//creating nested array 
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        }).reduce((arr, el) => {//covert 2d arr to 1d array
            return arr.concat(el)//arr IS prev ARRAY , el IS current value 
        }, []);//[] is the initial ARRAY

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);