import { Schema, model } from 'mongoose';
import crypto from 'crypto';

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    nickname: {
        type: String,
        trim: true,
        unique: 'Nickname is already in use',
        match: [/^[a-zA-Z0-9_]*$/, 'Please enter a valid nickname'],
        required: 'Nickname is required'
    },
    permissions: {
        type: String,
        trim: true,
        enum: ['admin', 'user', 'moder'],
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: String
});

UserSchema.virtual('password')
            .set(function(password) {
                this._password = password;
                this.salt = this.makeSalt();
                this.hashed_password = this.encryptPassword(password);
            })
            .get(function() {
                return this._password;
            });

UserSchema.path('hashed_password').validate(function(v) {
    if(this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters');
    }
    if(this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

UserSchema.methods = {
    // comparing passwords
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    // hashing password
    encryptPassword: function(password) {
        if(!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                            .update(password)
                            .digest('hex');
        } catch(err) {
            return '';
        }
    },
    // making an original identifier for encrypting(same passwords looks different)
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
}

export default model('User', UserSchema);