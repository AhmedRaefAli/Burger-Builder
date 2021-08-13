import React from 'react';
import classes from './Order.css';


const order = (props)=>{
    const orderingerdints = [];
    for (let ingName in props.ingredients){
        if(ingName!=="_id"){
            orderingerdints.push(
                {
                    name:ingName,
                    amount : props.ingredients[ingName]
                });
            }
}

    const ingOutput =orderingerdints.map(ig=>{
        return <span 
                    style={{textTransform:"capitalize",
                            display:"inline-block",
                            margin:"0 8px",
                            border:"1px solid #ccc",
                            padding:"5px"}}
                    key={ig.name}>{ig.name}:   ({ig.amount}) </span>
    })
    
    return(
        <div className={classes.Order}>
            <p>ingredients : {ingOutput}</p>
            <p>Price <strong>USD {  props.totalPrice.toFixed(2)} </strong></p>
            <p>delivaryMethod : {props.delivaryMethod}</p>
        </div>
    );
};

export default order;
