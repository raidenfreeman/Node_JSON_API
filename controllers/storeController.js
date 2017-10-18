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

exports.updateStore = async(req, res) => {
    const updatedStore = await Store.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true,
        runValidators: true
    }).exec();
    req.flash('success', `Updated ${updatedStore.name} successfully! <a href="/stores/${updatedStore.slug}">View Store</a>`);
    res.redirect(`/stores/${updatedStore._id}/edit`);
}

exports.getStores = async(req, res) => {

    const stores = await Store.find();

    res.render('stores', {
        title: 'Stores',
        stores
    });
}

exports.editStore = async(req, res) => {

    const store = await Store.findOne({
        _id: req.params.id
    });
    debug('Store Data=> %O', store);

    res.render('editStore', {
        title: `Edit '${store.name}'`,
        store
    });
}