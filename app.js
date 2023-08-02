require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const userRouter = require('./routes/users')
const bookRouter = require('./routes/books')
const commentRouter = require('./routes/comments')
const writerRouter = require('./routes/writers')
const session = require('express-session')
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'test lib'}));
app.use(async (req,res,next)=>{
    try{
        await next();
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

app.use('/users', userRouter)
app.use('/books',bookRouter)
app.use('/comments', commentRouter)
app.use('/writers',writerRouter)

mongoose.connect(process.env.DB_CONNECTION);

app.listen(port,()=>{
    console.log(`Server listening on ${port} port`);
});
