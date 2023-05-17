const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../server/models/User');
const cors = require('cors');

// https://preview.colorlib.com/theme/stories/

const app = express();

//middlewares
app.use(express.json())

//cross origin resource Sharing
app.use(cors())

const dbUrl = "mongodb://127.0.0.1:27017/foodblog"

const PORT = 4000

mongoose.connect(dbUrl)
    .then(() => console.log("Connection established"))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send("api up and running")
})

app.post("/register",async (req,res) => {
     UserModel.findOne({email: req.body.email}).then((userData) => {
        if(userData){
            res.send("User already exists")
        }
        else {
           let user = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
          user.save().then(() => {
            res.send("User successfully signed up")
          })           
        }
     })
})



app.post('/login',async (req,res)=> {
     UserModel.findOne({email: req.body.email}).then((userData) =>{

         if(!userData){
            res.send({ message:"wrong email"})
         }


        if(req.body.password === userData.password){
            res.send({message:"login Successfull",status:200})
        }else {
            res.send({message:"login Failure"})
        }
     })
})



app.listen(PORT,() => {
    console.log("Running on port 4000")
})



