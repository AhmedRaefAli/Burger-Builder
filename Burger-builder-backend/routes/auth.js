const express = require("express");
const authController = require("../controllers/auth");
const { body } = require('express-validator/check');
const User = require('../models/Users');

const router = express.Router();

router.post('/post-user',
                        [
                            body('password')
                            .trim()
                            .isLength({ min: 5 })
                            .withMessage('Short Password'),
                            body('email')
                            .trim()
                            .isEmail()
                            .withMessage('Please enter a valid email.')
                            .custom((value, { req }) => {
                              return User.findOne({ email: value }).then(userDoc => {
                                if (userDoc) {
                                  return Promise.reject('E-Mail address already exists!');
                                }
                              });
                            })
                            .normalizeEmail()],                    
                        authController.signUP);

router.post('/get-user',authController.SignIn);
module.exports = router;
