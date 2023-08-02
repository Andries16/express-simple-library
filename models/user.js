const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userShema = schema({
    name: { 
        type: String 
    },
    email: { 
        type: String, 
        required : true, 
    },
    password: { 
        type: String, 
        required:true,
    },
    role: {
        type: Number,
        required: true,
    }
})  

module.exports = mongoose.model('User',userShema);