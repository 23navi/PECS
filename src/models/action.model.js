const mongoose= require("mongoose");


const actionSchema = new mongoose.Schema({
    
    actionId:{
        type:String
    },
    actionName:{
        type:String
    },
    image:{
        type:String,
        default:"http://i.imgur.com/qK42fUu.jpg"
    },
})

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;


