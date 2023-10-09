const mongoose = require("mongoose")
let express = require("express");
let cors = require("cors");
let morgan = require("morgan");
let fs = require('fs');
let path = require('path');
let multer = require("multer")

const storage = multer.diskStorage({
  destination:(req, file, cb)=> {
    cb(null, "uploads");
  },
  filename:(req, file, cb)=> { 
    console.log(file);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,`${Date.now()}_${file.originalname}` );
  }
})

const upload = multer({ storage: storage })

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'))//access to uploads floders into public


let connectToMDB = async ()=>{

  try {
    
    await mongoose.connect("mongodb+srv://Jayasurya:Jayasurya24@cluster0.pbx3mjf.mongodb.net/CopyCat?retryWrites=true&w=majority")
    console.log("Successfully connected to 🍃 ");

  } catch (error) {
    console.log("Unable to connect MonogoDB");
    
  }
};



// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));


let middleWareFunc =(req,res,next)=>{

    console.log("execute MiddleWare Function ")
    next();
};

let preparingTheLand = (req,res,next)=>{

  console.log("Stages of 🌾 field :")
  console.log("1.Farmers get to work on the field, will try to finish all the preparations before the rainy season");
next();
}

let paddySeedlings =(req,res,next)=>{
  console.log("2.Transplanting the paddy seedlings");
  next();

}
let maintenance = (req,res,next)=>{
console.log("3.Maintenance of the field");
  next();
}

let harvesting =(req,res,next)=>{
  console.log("4.Harvesting");
  console.log("5.Milling")
  next();
}
// app.use(middleWareFunc)
// app.use(preparingTheLand);
// app.use(paddySeedlings);
// app.use(maintenance);
// app.use(harvesting);




 app.get("/getMovie",middleWareFunc,preparingTheLand,paddySeedlings,maintenance,harvesting,async (req,res)=>{

  let wallE = {
    name:"WALL-E",
    image:"../images/walle.jpg",
    stars:"Ben Burtt",
    rating:4.8,
    director:"Andrew Stanton"
  }
  let doraemon = {
    name:"Doraemon",
    image:"https://i.pinimg.com/564x/e0/78/e6/e078e6d137d5b4c89b8b051138840ced.jpg",
    stars:"Nobita",
    rating:5.7,
    director:" Shogakukan"
  }
  let johnWick = {
    name:"John Wick",
    image:"https://i.pinimg.com/564x/ef/37/15/ef3715a1c5a38a6584c0c0d0434b2501.jpg",
    stars:"Keanu Reeves",
    rating:4.6,
    director:" Chad Stahelski"
  }
  let fightClub = {
    name:"Fight Club",
    image:"https://i.pinimg.com/564x/b0/a8/3f/b0a83f4df7e05e92c9d1a707e775b5e8.jpg",
    stars:"Edward Norton, Brad Pitt",
    rating:4.7,
    director:" David Fincher"
  }
  let logan = {
    name:"Logan",
    image:"https://i.pinimg.com/564x/ee/d9/31/eed9317211d4e3480184ece97561619f.jpg",
    stars:"Hugh Jackman",
    rating:4.8,
    director:" James Mangold"
  }
  let venom = {
    name:"Venom",
    image:"../images/venom.jpg",
    stars:"Tom Hardy",
    rating:4.0,
    director:" Ruben Fleischer"
  }
  let daredevil = {
    name:"Daredevil",
    image:"https://i.pinimg.com/564x/55/0c/42/550c42c58b21d88adb1c9d8636f95178.jpg",
    stars:"Charlie Cox",
    rating:4.8,
    director:" Drew Goddard"
  }
  let tenet = {
    name:"Tenet",
    image:"https://i.pinimg.com/564x/a9/74/df/a974dfaa3287e30a9b745578f0cef49f.jpg",
    stars:"John David, Robert Pattinson",
    rating:4.0,
    director:" Christopher Nolan"
  }
  let batman = {
    name:"Batman",
    image:"https://i.pinimg.com/564x/c0/17/45/c0174559dcfd87da08495b700fffcf81.jpg",
    stars:"Robert Pattinson",
    rating:3.9,
    director:" Matt Reeves"
  }
  let deadpool = {
    name:"Deadpool",
    image:"https://i.pinimg.com/564x/a8/d9/8b/a8d98b9f592899fce6d5801839f63fe7.jpg",
    stars:"Ryan Reynolds",
    rating:4.6,
    director:" Tim Miller"
  }
  let ironGiant = {
    name:"Iron Giant'",
    image:"https://i.pinimg.com/564x/8c/ee/02/8cee025324503d79b1aef04456b60fe9.jpg",
    stars:"Vin Diesel",
    rating:4.9,
    director:"Brad Bird"
  }

  let master = {
  name:"Master 🧍‍♂️",
  image:"https://i.pinimg.com/564x/93/d6/66/93d666f3d76cd25392915e6aa501b626.jpg",
  stars:"Vijay",
  rating:4.3,
  director:"Lokesh Kanagaraj"
}
let shinchan = {
  name:"Shinchan",
  image:"https://i.pinimg.com/564x/60/d9/b1/60d9b17179a59e225c2722a4b4e019f6.jpg",
  stars:"Shinchan",
  rating:5.0,
  director:" Yoshito Usui"
  
}

let moviesArr = [wallE,doraemon,johnWick,venom,fightClub,logan,daredevil,tenet,batman,deadpool,ironGiant,master,shinchan];
res.json(moviesArr);


});


  let userSchema = new mongoose.Schema({

firstName:String,
lastName:String,
country:String,
email:String,
date:String,
password:String,
confirmPassword:String,
phoneNumber:Number,
profile:String
});

let user = new mongoose.model("POST",userSchema);



app.post("/validateLogin",upload.none(), async (req,res)=>{
console.log(req.body);

let userDetails = await user.find().and
({email:req.body.email});

console.log(userDetails);

if(userDetails.length == 0){
res.json({Status:"Failed",msg:"User doesn't exist"});
}else{

if(userDetails[0].password == req.body.password){
res.json({Status:"Success",msg:"Valid Login Details",data:userDetails[0]});
}else{
  res.json({Status:"Failed",msg:"Incorect Password."});
}

}
// console.log(userDetails);
// res.json(userDetails);


});

app.post("/signup",upload.single("profile"),async(req,res)=>{
  
 console.log("Recived the request from the client");
 console.log(req.file);//profile
 console.log(req.body);

let userDetails = await user.find().and
({email:req.body.email});

if(userDetails.length>0){

  res.json({Status:"Failed",msg:"User already exists"})
}else{

}
try{

  let newUser = new user({

    firstName:req.body.fn,
    lastName:req.body.ln,
    country:req.body.country,
    email:req.body.email,
    date:req.body.date,
    password:req.body.password,
    confirmPassword:req.body.cpassword,
    phoneNumber:req.body.pn,
    profile:req.file.path,
  
   });
  
   await user.insertMany([newUser]);
   res.json({Status:"Success",msg:"Created Successfully."});
  
} catch (error) {

   res.json({Status:"Failed", msg:"User cannot post data"});

}

});

app.patch("/updateDetails",upload.single("profile"), async (req,res)=>{

console.log(req.body);
 await user.updateMany({email:req.body.email},
  {firstName:req.body.fn,
    lastName:req.body.ln,
    date:req.body.date,
    password:req.body.password,
    country:req.body.country,
    confirmPassword:req.body.cpassword,
    phoneNumber:req.body.pn,
    profile:req.file.path,
    }   
    );
res.json(["collected the data"]);  
});

app.delete("/deleteProfile",upload.none(), async (req,res)=>{

  try {
    let deleteUser = await user.deleteMany({email:req.body.email});
    res.json({Status:"Suceess",msg:"Suceessfully Delete Profile"});
    
  } catch (error) {
    res.json(error);
    
  }
 });

app.delete("/deleteAcc",upload.none(),async(req,res)=>{

  try {
    let deleteUser = await user.
    deleteMany({email:req.body.email});
    res.json({Status:"Success",msg:"Successfully delete you account"})
    
  } catch (error) {
  res.json(error);
    
  }
});



app.listen(7777,()=>{

    console.log("Server is running🔥");

});

connectToMDB();
