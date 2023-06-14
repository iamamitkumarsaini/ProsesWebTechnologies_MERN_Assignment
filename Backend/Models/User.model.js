const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require:true
    },
    mobileNum: {
        type: Number,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    address: {
        type: String,
        require:true
    },
    image_url: String
}, {
    versionKey: false
});


const UserModel = mongoose.model("user",userSchema);


module.exports = { UserModel };