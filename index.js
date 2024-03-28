import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;
mongoose.connect("\mongodb+srv://aayushknight:pSaQ6QxvJvJUfvBL@cluster0.pbj819f.mongodb.net/ToDo").then(()=>console.log("mongoD connected"))
.catch((err)=>console.log(err));
const userSchema = new mongoose.Schema ({
    item:{
        type:String,
    }
});
const user = mongoose.model("item",userSchema);

const result1 = new user({
    item: "WRITE YOUR DAILY TASK ",
});
const result2 = new user({
    item: "<--- DELETE",
});

const arr = [result1,result2];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/",async(req,res)=>{
    const vaues = await user.find({});
    const myCount = await user.countDocuments({});
    if(myCount == 0){
        user.insertMany(arr);
        res.redirect("/"); 
    }
    else{
        res.render("index.ejs",{newListItems:vaues});
    }
    });

app.post("/submit",async(req,res)=>{
    const newItem = req.body.n;
    const add = await(user.create)({
       item: newItem, 
    }); 
    res.redirect("/");
});

app.post("/delete",(req,res)=>{
    const checkedId = req.body.checkbox;
    user.findByIdAndRemove(checkedId).then(function () {
        console.log("Successfully removed");
    })
    .catch(function (err) {
        console.log(err);
    });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  