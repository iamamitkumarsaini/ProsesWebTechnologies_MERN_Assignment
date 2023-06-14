const mongoose = require("mongoose");


// Defining the user Schema so that only matched type with schema will be saved to database
// also making all feilds require: true so that it will be necessary to have this feilds in request
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
