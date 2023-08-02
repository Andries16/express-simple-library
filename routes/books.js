const express = require('express')
const bodyParser = require('body-parser')
const Book = require('../models/book')
const router = express.Router()
const Joi = require('joi')
const {Auth,Writer} = require('../middleware/auth')

const bookSchema = Joi.object({
    title: Joi.string().required().min(2).max(30),
    url: Joi.string().required(),
    writerId: Joi.string().required()
})

const updateBookSchema = Joi.object({
    title: Joi.string().min(2).max(30),
    url: Joi.string(),
    writerId: Joi.string()
})

router.route('/')
    .get(async (req,res)=>{
        const books = await Book.find();
        res.status(200).json(books); 
    })
    .post(bodyParser.json(), Writer, async (req,res)=>{
        const {error} = bookSchema.validate(req.body);
        if(!error){
            const book = new Book(req.body);
            const newBook = await book.save();
            res.status(200).json(newBook);    
        }
        res.status(400).send(error)    
    })

router.route('/:id')
    .get(async (req,res)=>{
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    })
    .put(bodyParser.json(), Auth, async (req,res)=>{  
        const {error} = updateBookSchema.validate(req.body);
        if(!error){     
            const book =await Book.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json(book);
        }
        res.status(400).send(error)
    })
    .delete(Auth, async (req,res)=>{  
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).send("Book deleted")
    })

module.exports = router;