const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    userID: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    }
});

mongoose.model('Article', UserSchema);