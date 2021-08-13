//const express = require("express");
const ordermodel = require("../models/orders");
const  user = require("../models/Users");
const mongoose = require("mongoose");

exports.getOrders=(req,res,next)=>{
    const currentPage = req.query.page || 1;
    const perPage = 25;
    let totalItems;
    const userId = req.body.userID;
    console.log(req.body);
    let authziOrder= [];
    ordermodel.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return ordermodel.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(orders=>{
      orders.map(order=>{
        if(order.customer==userId){
          authziOrder.push(order);
        }
      })
      return authziOrder;
    })
    .then(authziOrder=>{
        console.log(authziOrder);
        res.status(200).json({
            message: 'Fetched orders successfully.',
            orders: authziOrder,
          });
    })
    .catch(err => {
        console.log(err);
        if (!err.statusCode) {
          err.statusCode = 500;
          err.message="server error at getting orders "
        }
        next(err);
      });
};


exports.postOrder=(req,res,next)=>{
    // console.log("order req.body.data");
    console.log(req.body);
    const ingre=req.body.ingredients;
    const price=req.body.price;
    const customerDetails= req.body.userID;
    const Dmethod=req.body.deliveryMethod;
    const street=req.body.street;
    const userMobileNumber=req.body.mobileNumber;
    const userName=req.body.name;
    const userZipCode=req.body.zipCode;

    // console.log(req.body.orderData);
    const customerASObjectID = mongoose.Types.ObjectId(customerDetails);
    const orderModel = new ordermodel ({
            ingredients:ingre,
            totalPrice:price,
            delivaryMethod:Dmethod,
            customer:customerASObjectID,
            name:userName,
            adress:street,
            zibCode:userZipCode,
            mobileNumber:userMobileNumber
        }
    );

    console.log (orderModel);
    orderModel
    .save()
    .then(result => {
        return user.findById(customerASObjectID);
      })
      .then(user => {
        console.log(user);
        creator = user;
        user.orders.push(orderModel);
        return user.save();
      })
    .then(result=>{
        //console.log(result);    
        res.status(201).json({
            message: 'order created successfully!',
            order: orderModel
        })
    })
    .catch(err => {
        console.log(err);
        if (!err.statusCode) {
          err.statusCode = 500;
          err.message="server error at posting New order"
        }
        next(err);
      });
};