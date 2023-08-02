const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bodyParser = require('body-parser')

router.route('/')
    .get(async (req,res)=>{
        try{
            const users = await User.find({"role":1})
            res.status(200).json(users)
        }
        catch(err){
            res.status(400).json({message: err.message})
        }
    })
    .post(bodyParser.json(), async (req,res)=>{
        req.body.role = 1;
        const user = new User(req.body)

        try{
            const newUser = await user.save()
            res.status(200).json(newUser)
        }
        catch(err){
            res.status(400).json({message: err.message})
        }
    })

router.route('/:id')
    .get(async (req,res)=>{
        try{
            const user = await User.findById(req.params.id,).find({"role":1})
            res.status(200).json(user)
        }
        catch(err){
            res.status(400).json({message: err.message})
        }
    })
    .put(bodyParser.json(), async (req,res)=>{
        try{
            const result = await User.findByIdAndUpdate(req.params.id,req.body)
            res.status(200).json(result)
        }
        catch(err){
            res.status(400).json({message: err.message})
        }
    })
    .delete(async (req,res)=>{
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200)
        }
        catch(err){
            res.status(400).json({message:err.message})
        }
    })

module.exports = router;