const express = require('express')
const Comment = require('../models/comment')
const router = express.Router()
const bodyParser = require('body-parser')
const Joi = require('joi')
const { Admin } = require('../middleware/auth')

const commentSchema = Joi.object({
    body: Joi.string().required().min(2).max(400),
    date: Joi.number().required(),
    bookId: Joi.string().required()
})

const updateCommentSchema = Joi.object({
    body: Joi.string().min(2).max(400),
    date: Joi.number(),
    bookId: Joi.string()
})

router.get("/book/:book_id",async (req,res)=>{
        const comments = await Comment.find({bookId:req.params.book_id}).populate("bookId");
        res.status(200).json(comments)
    })
router.post("/",bodyParser.json(), async (req,res)=>{

    const {error} = commentSchema.validate(req.body);
    if(!error){
        const comment = new Comment(req.body)
        const newComment = await comment.save();
        res.status(200).json(newComment)
    }
    res.status(400).send(error)
    })

router.route('/:id')
    .get(async (req,res)=>{
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment)
    })
    .put(bodyParser.json(), async (req,res)=>{
        const {error} = updateCommentSchema.validate(req.body)
        if(!error){
            const comment = await Comment.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json(comment);
        }
        res.status(400).send(error)
    })
    .delete(Admin, async (req,res)=>{
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).send("Comment deleted")
    })

module.exports = router