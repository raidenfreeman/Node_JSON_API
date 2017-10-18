const mongoose = require('mongoose');

exports.loginForm = (req, res, next) => {
    res.render('login', {
        title: 'Login'
    });
}

exports.registerForm = (req, res, next) => {
    res.render('register', {
        title: 'Register'
    });
}

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name'); // from  express validator
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'Not a valid email!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Empty password!').notEmpty();
    req.checkBody('passwordConfirmation', 'Passwords don\'t match!').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', {
            title: 'Register',
            body: req.body,
            flashes: req.flash()
        });
        return;
    } else {
        next();
    }
};