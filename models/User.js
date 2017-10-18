const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('password-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid e-mail address!'],
        required: 'Email missing, it\'s required!'
    },
    name: {
        type: String,
        required: 'Please provide a name.',
        trim: true
    }
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});
userSchema.plugin(mongodbErrorHandler);

// storeSchema.pre('save', async function (next) {
//     if (!this.isModified('name')) {
//         next();
//         return;
//     }
//     //do this only when creating, or modified name

//     //this has the value of the store we're saving
//     this.slug = slug(this.name);
//     const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
//     // Find all stores that start with the same slug and end with -XXX
//     const storesWithSlug = await this.constructor.find({
//         slug: slugRegEx
//     });
//     // If there's more than 0
//     if (storesWithSlug.length) {
//         // Add +1 to the number of stores, and append it to the slug
//         this.slug = `${this.slug}-${storesWithSlug.length+1}`;
//     }

//     next();
// });
module.exports = mongoose.model('User', userSchema);