const debug = require('debug')('ln');
const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
    // debug('From Home Page %s', req.name);
    res.cookie('gg', 'some val', {
        maxAge: 50000
    });
    res.render('hello', {
        name: req.name
    });
}

exports.addStore = (req, res) => {
    res.render('editStore', {
        title: 'Add Store'
    });
}

exports.catchErrors = (func) => {
    return function (req, res, next) {
        // if an error happens on the provided function
        // pass to the next middleware (stop routing, go to errors)
        return func(req, res, next).catch(next);
    }
}

exports.createStore = async(req, res) => {
    const store = await (new Store(req.body)).save();
    req.flash('success', `Added ${store.name} successfully!`);
    res.redirect(`/store/${store.slug}`);
}

exports.getStores = async (req, res) => {

    const stores = await Store.find();

    res.render('stores', {
        title: 'Stores',
        stores
    });
}