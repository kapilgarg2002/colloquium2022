const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



const app = express();



const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kapil:kapil@cluster0.jxchm.mongodb.net/contactsDB";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



mongoose.connect("mongodb+srv://kapil:kapil@cluster0.jxchm.mongodb.net/Colloquim"||"mongodb://localhost:27017/Colloquim",{ useNewUrlParser: true, useUnifiedTopology: true });


app.use("/",express.static("public"));
app.use("/clueless",express.static("cluelesss"));
app.use("/conquest",express.static("codingConquest"));
app.use("/prophylaxis",express.static("prophylaxis"));
app.use("/registered",express.static("registered"));
app.use(bodyParser.urlencoded({extended: true}));


const individual = {
  name: String,
  phone:String,
  email:String,
};

const user = {
  teamName:String,
  password:String,
  teamMember1 :individual,
  teamMember2:individual,
  teamMember3:individual,
  collegeName: String,
  answer1:Boolean,
  answer2:Boolean,
  answer3:Boolean,
}

const codeParti = {
    teamMember: individual,
    college: String,
}
const clueParti = {
    teamName: String,
    teamMember1: individual,
    teamMember2: individual,
    teamMember3: individual,
    teamMember4: individual,
    college: String,
}
const debug = mongoose.model("debug",user);
const code= mongoose.model("code",codeParti);
const clueless= mongoose.model("clueless",clueParti);

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.get("/prophylaxis",function(req,res){
    res.sendFile(__dirname+"/prophy.html");
});

app.get("/conquest" ,function(req,res){
    res.sendFile(__dirname+"/code.html");
});
app.get("/clueless",function(req,res){
    res.sendFile(__dirname+"/clueless.html");
});
app.get("/registered",function(req,res){
  res.sendFile(__dirname+"/registered/index.html")
})


app.post("/prophylaxis",function(req,res){
  const teamMember1 = {
    name:req.body.teamMember1Name,
    phone:req.body.teamMember1Phone,
    email:req.body.teamMember1Email
  };
  const teamMember2 = {
    name:req.body.teamMember2Name,
    phone:req.body.teamMember2Phone,
    email:req.body.teamMember2Email
  };  
  const teamMember3 = {
    name:req.body.teamMember3Name,
    phone:req.body.teamMember3Phone,
    email:req.body.teamMember3Email
  };
  const tempUser=new debug({
    teamName:req.body.teamName,
    password:req.body.password,
    teamMember1:teamMember1,
    teamMember2:teamMember2,
    teamMember3:teamMember3,
    collegeName:req.body.college,
    answer1:false,
    answer2:false,
    answer3:false
  });
  debug.findOne({teamName:req.body.teamName},(err,result)=>
  {
    if(!err)
    {
      if(result)
      {
        res.send("Early Bird Catches the Worm!!<br><h1>Naya Team Name Socho</h1>");
      }
      else
      {
        tempUser.save(function(err){
          if(!err){
            res.redirect('/registered');
          }
        });
      }
    }
    else
    {
      res.send("Error-Page");
    }
  })
});

app.post("/conquest",function(req,res){
    const teamMember = {
    name:req.body.teamMemberName,
    phone:req.body.teamMemberPhone,
    email:req.body.teamMemberEmail
  };
  const tempUser=new code({
    teamMember:teamMember,
    college:req.body.college,
  });
  tempUser.save(function(err){
    if(!err){
      res.redirect('/registered');
    }
  });

});

app.post("/clueless",function(req,res){
   const teamMember1 = {
    name:req.body.teamMember1Name,
    phone:req.body.teamMember1Phone,
    email:req.body.teamMember1Email
  };
  const teamMember2 = {
    name:req.body.teamMember2Name,
    phone:req.body.teamMember2Phone,
    email:req.body.teamMember2Email
  };  
  
  const teamMember3 = {
    name:req.body.teamMember3Name,
    phone:req.body.teamMember3Phone,
    email:req.body.teamMember3Email
  };
  const teamMember4 = {
    name:req.body.teamMember4Name,
    phone:req.body.teamMember4Phone,
    email:req.body.teamMember4Email
  };
  
  const tempUser1=new clueless({
    teamName: req.body.teamName,
    teamMember1: teamMember1,
    teamMember2: teamMember2,
    teamMember3: teamMember3,
    teamMember4: teamMember4,
    college: req.body.college,
    
  })
  tempUser1.save(function(err){
    if(!err){
      res.redirect('/registered');
    }
  });
})

app.listen(process.env.PORT||3000, function(){
    console.log("server started at port 3000");
});
