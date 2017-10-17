const debug = require('debug')('ln');

exports.myMiddleware = (req, res, next) => {
    req.name = 'Lina Inverse';
    next();
}

exports.homePage = (req, res) => {
    // debug('From Home Page %s', req.name);
    res.cookie('gg', 'some val', {
        maxAge: 50000
    });
    res.render('hello', {
        name: req.name
    });
}