const express = require('express')
const Comment = require('../models/comment')
const router = express.Router()
const bodyParser = require('body-parser')

router.get("/book/:book_id",async (req,res)=>{
        try{
            const comments = await Comment.find({bookId:req.params.book_id}).populate("bookId");
            res.status(200).json(comments)
        }
        catch(err){
            res.status(400).json({message:err.message})
        }
    })
router.post("/",bodyParser.json(), async (req,res)=>{
        const comment = new Comment(req.body)

        try{
            const newComment = await comment.save();
            res.status(200).json(newComment)
        }
        catch(err){
            res.status(400).json({message:err.message})
        }
    })

router.route('/:id')
    .get(async (req,res)=>{
        try{
            const comment = await Comment.findById(req.params.id);
            res.status(200).json(comment)
        }
        catch(err){
            res.status(400).json({message: err.message})
        }
    })
    .put(bodyParser.json(), async (req,res)=>{
        try{
            const comment = Comment.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json(comment);
        }
        catch(err){
            res.status(400).json({message:err.message});
        }
    })
    .delete(async (req,res)=>{
        try{
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).send("Post deleted")
        }
        catch(err){
            res.status(400).json({message: err.message})
        }
    })

module.exports = router