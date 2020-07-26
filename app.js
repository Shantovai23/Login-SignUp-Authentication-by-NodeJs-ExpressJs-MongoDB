const express=require('express')
const morgan=require('morgan')
const mongoose=require('mongoose')
const session=require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);



//import routes
const authRoute=require('./routes/authRoute')
const dashboardRoutes=require('./routes/dashboardRoute')

//import middlewawre

const{bindUserWithRequest}=require('./middleware/authMiddleware')
const setLocals=require('./middleware/setLocals')


//MongoDB store


const MONGODB_URI='mongodb://localhost:27017/BlogBD'

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires:1000*60*60*2
  });

  const app=express()

//setup view engine
app.set('view engine','ejs')
app.set('views','views')

//middleware array
const middleware=[
   morgan('dev'),
   express.static('public'),
   express.urlencoded({extended:true}),
   express.json(),
   session({
       secret: process.env.SECRET_KEY || 'SECRET_KEY',
       resave:false,
       saveUninitialized:false,
       store:store
   }),
   bindUserWithRequest(),
   setLocals()
]

app.use(middleware)


app.use('/auth',authRoute)
app.use('/dashboard',dashboardRoutes)



app.get('/',(req,res)=>{

    res.json({
        message:'Hello World'
    })
})

const PORT=process.env.PORT || 8080

mongoose.connect(MONGODB_URI, {useNewUrlParser: true , useUnifiedTopology: true })

.then(()=>{
    console.log('Database connected');
    app.listen(PORT,()=>{
        console.log(`server is running on PORT ${PORT}`)
    })
})

.catch(e=>{
  return  console.log(e);
})

