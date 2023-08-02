const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Joi = require('joi')
const {Auth} = require('../middleware/auth')

const userSchema = Joi.object({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.number().required()
})

const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.number()
})

router.route('/')
    .get(async (req,res)=>{
        const users = await User.find({"role":1})
        res.status(200).json(users)
    })
    .post(bodyParser.json(), async (req,res)=>{
        req.body.role = 1;
        const {error} = userSchema.validate(req.body)
        if(!error){
            const user = new User(req.body)
            const newUser = await user.save()
            res.status(200).json(newUser)
        }
        res.status(400).send(error);
    })

router.route('/:id')
    .get(async (req,res)=>{
        const user = await User.findById(req.params.id,).find({"role":1})
        res.status(200).json(user)
        
    })
    .put(bodyParser.json(), Auth, async (req,res)=>{
        const {error} = updateUserSchema.validate(req.body)
        if(!error){
            const id = new mongoose.Types.ObjectId(req.params.id)
            const result = await User.findOneAndUpdate({'_id':id,'role':1},req.body)
            res.status(200).json(result || "Writer not found")
        }
    res.status(400).send(error);
    })
    .delete(Auth, async (req,res)=>{
        const id = new mongoose.Types.ObjectId(req.params.id)
        const user = await User.findOneAndDelete({"_id":id,"role":1})
        res.status(200).send(user ? "Writer deleted":"Writer not found")
    })

module.exports = router;