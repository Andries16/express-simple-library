require('dotenv').config();
const mongoose = require("mongoose");

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const userRouter = require('./routes/users')
const bookRouter = require('./routes/books')
const commentRouter = require('./routes/comments')
const writerRouter = require('./routes/writers')

app.use('/users', userRouter)
app.use('/books',bookRouter)
app.use('/comments', commentRouter)
app.use('/writers',writerRouter)

mongoose.connect(process.env.DB_CONNECTION);

app.listen(port,()=>{
    console.log(`Server listening on ${port} port`);
});
