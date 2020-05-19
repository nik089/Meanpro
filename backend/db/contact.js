let mongoose = require('mongoose');
//create contact schema (structure)
let conSchema = new mongoose.Schema({
    yn: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    cn: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

//model
module.exports = mongoose.model('contact', conSchema);
//end