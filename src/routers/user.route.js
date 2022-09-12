const express= require("express")
const router= express.Router();
const User= require("../models/user.model");


router.get("/register",(req,res,next)=>{
    const payload={}
    res.locals.title="Register"
    res.render("users/register.ejs",{payload});
})





router.post("/register",async(req,res,next)=>{
    // let user= await User.findOne({
    //     $or:[
    //         {username:req.body.username},
    //         {email:req.body.email}
    //         ]
    // })

    const idUser=await User.findOne({username:req.body.username.trim()});
    

    if (idUser){
        const payload={...req.body}
        let error="User already taken";
        payload.error=error
        res.locals.title="register"
        return res.render("users/register.ejs",{payload});
    }

    let user=User(req.body)
    user= await user.save();
    req.session.user=user;
    res.redirect("/pecs")
})



router.get("/login",(req,res,next)=>{
    const payload={}
    res.locals.title="Login"
    res.render("users/login.ejs",{payload});
})





router.post("/login",async(req,res,next)=>{

    //creating custom find function on User by userSchema.models
    const {user,error}= await User.findByCred(req.body);

    if(!user){
        const payload={...req.body}
        payload.error=error
        res.locals.title="login"
        return res.render("users/login",{payload});
    }
    req.session.user=user;
    res.redirect("/pecs");

})





router.get("/logout",(req,res,next)=>{
    if(req.session){
        req.session.destroy(()=>{
            res.redirect("/login")
        })
    }
})

module.exports= router;