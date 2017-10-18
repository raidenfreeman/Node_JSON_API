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
storeSchema.pre('save', async function (next) {
    if (!this.isModified('name')) {
        next();
        return;
    }
    //do this only when creating, or modified name

    //this has the value of the store we're saving
    this.slug = slug(this.name);
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    // Find all stores that start with the same slug and end with -XXX
    const storesWithSlug = await this.constructor.find({
        slug: slugRegEx
    });
    // If there's more than 0
    if (storesWithSlug.length) {
        // Add +1 to the number of stores, and append it to the slug
        this.slug = `${this.slug}-${storesWithSlug.length+1}`; 
    }

    next();
});

module.exports = mongoose.model('Store', storeSchema);