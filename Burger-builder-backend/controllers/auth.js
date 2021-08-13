const  user = require("../models/Users");
const { validationResult } = require('express-validator/check');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.SignIn=(req,res,next)=>{
    console.log(req.body);
    let email = req.body.email;
    let pass = req.body.password;
    
    let loadedUser;

    user.findOne({ email: email })
    .then(user => {
      if (!user) {
        
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(pass, user.password)})
      .then(isEqual => {
        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
          },
          'somesupersecretsecret',
          { expiresIn: '1h' }
        );

        res.status(200).json({
          token: token,
          message: 'USER loged in  successfully.',
          user: loadedUser,
          expiresIn:"3600"              
        });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
          error.message="server error at getting the user "
        }
        next(error);
      });
};


exports.signUP=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
  
    // console.log("auth req.body.data");

    console.log(req.body);
    const email=req.body.email;
    const password=req.body.password;

    
    bcrypt
    .hash(password, 12)
    .then( hashedpassw=>{
            const User = new user ({
                email:email,
                password:hashedpassw,

            }
        );
        return User.save();
    }
    )
    .then(result=>{
        const token = jwt.sign(
          {
            email: result.email,
            userId: result._id.toString()
          },
          'somesupersecretsecret',
          { expiresIn: '1h' }
        );
        //console.log(result);    
        res.status(201).json({
            token: token,
            message: 'user created successfully!',
            user: result,
            expiresIn:"3600"
        })
    })
    .catch(err => {
        console.log(err);
        if (!err.statusCode) {
          err.statusCode = 500;
          err.message="server error at posting New user "
        }
        next(err);
      });  
};