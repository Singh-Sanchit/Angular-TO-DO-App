const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

exports.user_signup = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(400).json({
                    status: false,
                    message: "Email Id Already Exist",
                    flag: -1
                });
            } else {
                bcrypt.hash(req.body.password, null, null, (err, hash) => {
                    if (err) {
                        console.log("Error in /api/rest/v1/todo/user/signup Creating Hash Password")
                        res.status(500).json({
                            message: "Internal Server Error"
                        });
                    } else {
                        const user = new User({
                            name: req.body.name,
                            gender: req.body.gender,
                            contact: req.body.contact,
                            country: req.body.country,
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                res.status(200).json({
                                    status: true,
                                    message: 'User Created',
                                    flag: 1
                                });
                            })
                            .catch(err => {
                                console.log(err)
                                console.log("Error in /api/rest/v1/todo/user/signup Inserting User in Database")
                                res.status(500).json({
                                    message: "Internal Server Error"
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            console.log("Error in /api/rest/v1/todo/user/signup Checking Email In Database")
            res.status(500).json({
                message: "Internal Server Error"
            });
        });

};

exports.user_login = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(users => {
            if (users.length < 1) {
                return res.status(404).json({
                    status: false,
                    message: 'Authorization Failed',
                    flag: -1
                });
            }
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                if (err) {
                    console.log("Error in /api/rest/v1/todo/user/login In Comparing Hash")
                    return res.status(500).json({
                        message: "Internal Server Error"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: users[0].email,
                            userId: users[0]._id
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        status: true,
                        message: 'Authorization Successful',
                        data: {
                            userId: users[0]._id,
                            email: users[0].email,
                        },
                        token: token,
                        flag: 1
                    });
                }
                res.status(404).json({
                    status: false,
                    message: "Password Does Not Match",
                    flag: -2
                });
            });
        })
        .catch(err => {
            console.log("Error in /api/rest/v1/todo/user/login Checking Email In Database")
            res.status(500).json({
                message: "Internal Server Error"
            });
        });
};

exports.user_forgetpassword = (req, res, next) => {

};