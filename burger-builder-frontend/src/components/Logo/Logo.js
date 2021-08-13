import React from 'react';
import burgerlogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.css';

const logo = ()=>(
    <div className={classes.Logo}>
        <img src = {burgerlogo} alt="MyBurger"/>
    </div>
);

export default logo;