const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Store name missing, and is required!'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String]
});

// we don't use arrow func, because we need 'this'
storeSchema.pre('save', function (next) {
    if(!this.isModified('name')){
        next();
        return;
    }
    //do this only when creating, or modified name

    //this has the value of the store we're saving
    this.slug = slug(this.name); // TODO: this is not unique!
    next();
});

module.exports = mongoose.model('Store', storeSchema);