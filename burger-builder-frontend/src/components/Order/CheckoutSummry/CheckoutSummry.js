import React  from 'react';
import classes from './CheckoutSummry.css';
import Burger from '../../Burger/Burger';
import Button from "../../UI/Button/Button";


const CheckoutSummry = (props)=>(
        
        <div className= {classes.CheckoutSummry}>
            <h1 style={{marginLeft:"40%"}}>we hope it tastes well !</h1>
            <div style={{width:'100%',margin:"auto"}}>
                <Burger ingredients= {props.ingredients}></Burger>
            </div>
            <div style={{marginLeft:"45%"}}>
                <Button btnType="Danger" clicked= {props.CancelButton} >Cancel</Button>
                <Button btnType="Success" clicked= {props.ContinueButton}>Continue</Button>
            </div>
        </div>

);

export default CheckoutSummry;