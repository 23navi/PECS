const mongoose= require("mongoose");
const bcrypt= require("bcrypt");

const userSchema = new mongoose.Schema({
    
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"/images/defaultProfile.png"
    },
    state1:{
        type:[String],
        default:["a1","a2","a3","a4","a5","a6","a7","a8","a9","a10"]
    },
    state2:{
        type:[String],
        default:["a1","a2","a3","a4","a5","a6","a7","a8","a9","a10"]
    },
    state3:{
        type:[String],
        default:["a1","a2","a3","a4","a5","a6","a7","a8","a9","a10"]
    },
},
{
    timestamps:true
})



userSchema.pre("save", async function(next){
    const user=this;
    if(user.isModified("password")){
        user.password= await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.statics.findByCred= async function(body){
    const user= await User.findOne({username:body.username})

    if(!user) return {error:"No such user"}

    const isMatch= await bcrypt.compare(body.password,user.password);
    if(!isMatch) return {error:"Invalid Cred"}
    return {user};
}

const User = mongoose.model('User', userSchema);

module.exports = User;