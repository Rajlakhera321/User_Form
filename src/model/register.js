const {Schema, model} = require("mongoose");

const registerSchema = new Schema({
    name: {
        type: Schema.Types.String
    },
    email: {
        type: Schema.Types.String
    },
    dob: {
        type: Schema.Types.Date
    },
    phone: {
        type: Schema.Types.String
    },
},{timestamps: true});

module.exports = model('user_form', registerSchema)