const express = require('express')
const bodyParser = require('body-parser')
const Book = require('../models/book')
const router = express.Router()

router.route('/')
    .get(async (req,res)=>{
        try{
            const books = await Book.find();
            res.status(200).json(books);
        }
        catch(err){
            res.status(400).json({message:err.message});
        }
    })
    .post(bodyParser.json(), async (req,res)=>{
        const book = new Book(req.body);
        try{
           const newBook = await book.save();
           res.status(200).json(newBook);
        }
        catch(err){
            res.status(400).json({message:err.message});
        }
    })

router.route('/:id')
    .get(async (req,res)=>{
        try{
            const book = await Book.findById(req.params.id);
            res.status(200).json(book);
        }
        catch(err){
            res.status(400).json({message:err.message});
        }
    })
    .put(bodyParser.json(), async (req,res)=>{
        try{
            const book = Book.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json(book);
        }
        catch(err){
            res.status(400).json({message:err.message});
        }
    })
    .delete(async (req,res)=>{
        try{
            await Book.findByIdAndDelete(req.params.id);
            res.status(200)
        }
        catch(err){
            res.status(400).json({message: err.message})
        }
    })

module.exports = router;