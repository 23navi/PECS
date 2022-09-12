const express = require("express");
const path= require("path");
const http= require("http");
require("./src/db/mongoose");
const ejsMate = require('ejs-mate');
const methodoverride=require("method-override");
const session= require("express-session");
const MongoStore=require("connect-mongo");

const app= express();
const server= http.createServer(app);

const ActionModel= require("./src/models/action.model");

const {sendNotification} = require("./email/acc");


app.set("views",path.join(__dirname,"views"));
app.set("view engine",'ejs');
app.engine('ejs', ejsMate);

app.use(express.urlencoded({extended:true})); //for post request 
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


const isLoggedIn= require("./middlewares/isLoggedin")


const store = MongoStore.create({
    mongoUrl: process.env.MONGODB_SERVER,
    // touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'squirrel'
    }
  });


app.use(session({
    secret:"key",
    cokkie:{maxAge:60000},
    resave:false,
    saveUninitialized:false,
    store:store,
}))


const userRouter=require("./src/routers/user.route");
app.use(userRouter);





app.get("/",(req,res)=>{
    console.log("hello");
    res.send("hello");
})

app.get("/pecs",isLoggedIn,(req,res)=>{
            var today = new Date()
            var curHr = today.getHours()
            let greet=""
            let state=0
            if (curHr < 12) {
                greet="Good Morning"
                state=1
            } else if (curHr < 18) {
                greet="Good Afternoon"
                state=2
            } else {
                greet="Good Evening"
                state=3
            }


    res.locals.greet=greet;
    res.locals.user=req.user;
    res.render("pecs")
})



async function stateArrayToActionArray(stateArray){
    let actions=[]
    for(let i=0;i<stateArray.length;i++){
    
        const a=await ActionModel.findOne({actionId:stateArray[i]})
        if(a && actions.length<9){
            actions.push(a)
        }
        console.log(a)
    }
    return actions;
        
}
app.get("/state/:state",isLoggedIn,async(req,res)=>{
    const stateArrayOfUser=req.user[`state${req.params.state}`]
    const actionArray=(await stateArrayToActionArray(stateArrayOfUser))
    console.log(actionArray)
    res.send(actionArray)
})

app.get("/action/:actionId",isLoggedIn,async(req,res)=>{
    const action= await ActionModel.findOne({actionId:req.params.actionId})
    res.send({soundId:`${action.actionName}.mp3`})
    //sendNotification("navisureka23@gmail.com",action.actionName,req.user.username);
    console.log({soundId:`${action.actionName}.mp3`})
})

module.exports = {app,server};

