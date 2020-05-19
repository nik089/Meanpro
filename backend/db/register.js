let mongoose = require('mongoose');
//create schema (structure)
let regSchema = new mongoose.Schema({
    fn: {
        type: String,
        required: true
    },
    ln: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    cpass: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

//model
module.exports = mongoose.model('register', regSchema);
//end