import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
const server = express();
server.use(cors({
    origin: "http://localhost:3000",
    methods: ["get","post"]
}));
server.use(express.json()); 
server.use(express.urlencoded({
    extended: true
}));


mongoose.connect('mongodb+srv://sssmid:sssmid@sssmid.kgvk0.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedtopology: true,
    strictQuery:false
},(done,err)=>{
    done?console.log("DB connected"):console.log('err')
})
//mongoose.set('strictQuery', false)

const dataSchema = new mongoose.Schema({
    family: []
})
var members = new mongoose.model("members", dataSchema);





server.post('/newdata',(req,res)=>{
    const family = req.body.member;

   var data = new members({
       family
    });
    console.log(data);
    //console.log(data);
    data.save().then(
        res.send({msg: "data saved",flag:true})

    )

})
server.get("/alldata", (req,res)=>{

members.find({},(err,data)=>{

        res.json(data);
        ////console.log(data)

})})
server.get("/insigts",(req,res)=>{
    let male = 0;
    let female = 0;
    let other = 0;
   members.find({},(err,userr)=>{
    userr.map((item)=>{
        item.family.map(item=>{
            if(item.gender === 'male'){male=male+1}
                if(item.gender === 'female')
            {female=female+1}
            if(item.gender === 'other'){
                other=other+1
            }
            
        })
    })
    res.send({male,female,other,userr});
})
})
var flag = false;
server.post("/updatemember",(req,res)=>{
    const id = req.body.id;
    const member = req.body.member;
    const i = req.body.i;
    const item = req.body.item;

    let finalname;
    let finalrelation;
    let finalage;
    let finallocation;
    let finalsssmid;
    let finalgender;
    let finaladhaar;
    let finalpan;
    if(member.name === '' ){
        finalname = item.name;
        //console.log("ifsssmid")
        //console.log(finalsssmid)
    }
    else{
        //console.log("elsesssmid")
        finalname = member.name;
        //console.log(finalsssmid)
    }
    if(member.relation === '' ){
        finalrelation = item.relation;
        //console.log("ifsssmid")
        //console.log(finalsssmid)
    }
    else{
        //console.log("elsesssmid")
        finalrelation = member.relation;
        //console.log(finalsssmid)
    }
    if(member.age === '' ){
        finalage = item.age;
        //console.log("ifsssmid")
        //console.log(finalsssmid)
    }
    else{
        //console.log("elsesssmid")
        finalage = member.age;
        //console.log(finalsssmid)
    }
    if(member.location === '' ){
        finallocation = item.location;
        //console.log("ifsssmid")
        //console.log(finalsssmid)
    }
    else{
        //console.log("elsesssmid")
        finallocation = member.location;
        //console.log(finalsssmid)
    }
    if(member.sssmid === '' ){
        finalsssmid = item.sssmid;
        //console.log("ifsssmid")
        //console.log(finalsssmid)
    }
    else{
        //console.log("elsesssmid")
        finalsssmid = member.sssmid;
        //console.log(finalsssmid)
    }
    if(member.gender === '' ){
        finalgender = item.gender;
        //console.log("ifsssmid")
        //console.log(finalsssmid)
    }
    else{
        //console.log("elsesssmid")
        finalgender = member.gender;
        //console.log(finalsssmid)
    }
    if(member.adhaar === '' ){
        finaladhaar = item.adhaar;
        //console.log("ifsssmid")
        //console.log(finalsssmid)
    }
    else{
        //console.log("elsesssmid")
        finaladhaar = member.adhaar;
        //console.log(finalsssmid)
    }
    if(member.pan === '' ){
        finalpan = item.pan;
        //console.log("ifsssmid")
        //console.log(finalsssmid)
    }
    else{
        ////console.log("elsesssmid")
        finalpan = member.pan;
        //console.log(finalsssmid)
    }
    //var target = "family.0."+i;
    ////console.log(target);

    members.find({_id: id,'family.sssmid': item.sssmid},(err,user)=>{
        if(err){
            res.send({msg: err})
            ////console.log(err)
        }
        if(user){
            //console.log(user)
            /*user.map((item=>{
                //console.log(item)
            }))*/
            if(user.length===0){
                ////console.log("blank")
                flag=false
                ////console.log(flag)
            }
            else{
                flag=true
                //console.log(flag)
            }
        }
    })
    ////console.log(flag)
    if(flag===true){
    members.updateOne({"family.sssmid":item.sssmid},{$set:{
            'family.$':{'name': finalname,
        'relation': finalrelation,
    'age': finalage,
    'location': finallocation,
    'sssmid': finalsssmid,
    'gender': finalgender,
    'adhaar': finaladhaar,
    'pan': finalpan}
        }},(err,user)=>{
            if(err){
                //console.log(err)
                res.send({msg: "err"})
            }
            else if(user){
                ////console.log(user.family[0])
                res.send({msg: 'User updated',flag: true})
            }
        });
    }
    else{
        res.send({msg: "SSSM-ID not found"})
    }

})
server.put("/deletefamily",(req,res)=>{
    const usssmid = req.body.family[0].sssmid;
    console.log(usssmid);
    members.deleteOne({'family.sssmid': usssmid},(err,user)=>{
        if(err){
            //console.log(err)
            res.send({msg: err})
        }
        if(user){
            res.send({msg: "Family deleted"});
            //console.log(user);
        }
    });
})
server.post("/familypage",(req,res)=>{
    let member = req.body.member;
    let id = req.body.id;
    //console.log(member[0].name)
    //console.log(id);

    members.find({_id: id},(err,user)=>{
        if(err){console.log(err)}
        else {
            let data = user;
member.map((item,i)=>{
    
    let temp_obj = {
        name: member[i].name,
        relation: member[i].relation,
        age: member[i].age,
        gender: member[i].gender,
        sssmid: member[i].sssmid,
        adhaar: member[i].adhaar,
        pan: member[i].pan
    }
    data[0].family.push(temp_obj);
})
           // console.log(data[0].family);
           members.findOneAndUpdate({_id: id},{$set:{family: data[0].family}},(err,user)=>{
               if(err){
                   console.log(err)
               }
               if(user){
                   console.log(user)
                   res.send({msg: "New member added"});
               }
               
           })

        }
    })
})
server.post("/deletemember",(req,res)=>{
    const id = req.body.id;
    const sssmid = req.body.sssmid;
    

    members.updateOne( {'_id': id},
{$pull:{"family":{"sssmid":sssmid}}},
(err,user)=>{
    if(err){
        console.log(err);
        res.send({msg: err})
    }
    if(user){
        console.log(user)
        res.send({msg: "member deleted"});
    }
});
})
server.post("/login",(req,res)=>{
    const {sssmid, password} = req.body;
    console.log(req.body)
    members.findOne({'family.sssmid': sssmid},(err,fam)=>{
        if(fam){
            if(password == sssmid){
                res.send({flag: true,fam});
                ////console.log(fam)
                
            }

            else{
                res.send({flag: false,message: "password invalid"});
            }
        }
        else{
            //console.log("user not found");
            res.send({flag: false,message: "User not found"})
        }
        if(err){
            console.log(err);
            //res.send({message: err});
        }
    })

})
const PORT = process.env.PORT || 7000;
server.use(express.static("client/build"));
if (process.env.NODE_ENV === "production") {
    
    server.get('/*', function (req, res) {
        //res.send("<h1>hellow world</h1>");
        res.sendFile(path.join(__dirname,'client','build', 'index.html'));
    });
}
else {
    server.get('/*', function (req, res) {

        //res.send("<h1>hellow world</h1>");
        res.sendFile(path.join(__dirname,'client','build', 'index.html'));
    });
    
}



server.listen(PORT, ()=>{
    console.log('running')
});
