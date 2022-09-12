
const isLoggedIn=(req,res,next)=>{
    console.log(req.originalUrl)
    if(req.session && req.session.user){
        req.user= req.session.user;
        return next()
    }
    req.session.url=req.originalUrl 
    console.log(req.session.url)
    res.redirect("/login")
}

module.exports=isLoggedIn;

