const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",(req,res)=>{
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const data ={
    members:[
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };

const jsonData = JSON.stringify(data);

const url = "https://us2.api.mailchimp.com/3.0/lists/5a3f8cf05e";
const options={
  method: "POST",
  auth: "pratham:35535b6fc2b2c9b9f5bb9b50de547bb6-us2"
}

const request = https.request(url,options,(response)=>{

if(response.statusCode === 200){
  res.sendFile(__dirname+"/success.html")
}else {
  res.sendFile(__dirname+"/failure.html")
}

  response.on("data",(data)=>{
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();
})

app.post("/failure",()=>{
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,()=>{
  console.log("server started");
})

//apikey
// 35535b6fc2b2c9b9f5bb9b50de547bb6-us2
//5a3f8cf05e
