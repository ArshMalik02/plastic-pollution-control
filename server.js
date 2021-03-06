const express=require('express')
const app=express()
const path=require('path')
const port=process.env.PORT||5005
const fs=require('fs')

let users
let data2
fs.readFile('./users.txt',(err,data)=>{
     if(err) console.log(err)
     else {
          data2=data
          try{
               users=JSON.parse(data2)
          }catch(e){
               users=[]
          }
          
     }
})




app.set('view engine', 'hbs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',express.static("Static"))

app.use('/home', express.static('Static')
)

app.post('/SignUp', function(req,res,next){
        
users.push({...req.body,donations:[]})
      res.sendFile(path.join(__dirname,"/Static/html/welcome.html"))
      fs.writeFile('users.txt', JSON.stringify(users),(err)=>{
           console.log(err)
      })
}
)

app.post('/donate', function(req,res,next){
for(let i in users){
     if(users[i].email==req.body.email){
          let user=users[i]
          users[i].donations.push(req.body)
          fs.writeFile('users.txt', JSON.stringify(users),(err)=>{
               if(err)console.log(err)
          })

     }

  }
  res.sendFile(path.join(__dirname,"/Static/html/thanksfordonating.html"))
 }
 )

app.post('/login', function(req,res,next){
     for(let i of users){
       if((i.email==req.body.email) && (i.password==req.body.password)){
        name=i.name
        email=i.email
        if(i.donations[i.donations.length-1]){
             donate=i.donations[i.donations.length-1].donate
        }else{
             donate=0
        }
       return res.render('dashboard.hbs',
       {name:name,
       email:email,
       donate: donate})
       }
     
     }
     res.send("<h1>Not Authorized</h1>")
})

app.listen(port, function(){
    console.log('Port started')
})