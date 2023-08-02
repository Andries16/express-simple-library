const express = require('express')
const User = require('../models/user')
const bodyParser = require('body-parser')
const router = express.Router()
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const { Admin } = require('../middleware/auth')

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
        const users = await User.find()
        res.status(200).json(users)
       
    })
    .post(bodyParser.json(), async (req,res)=>{
        const {error} = userSchema.validate(req.body)
        if(!error){
            req.body.password = await bcrypt.hash(req.body.password,10)
            const user = new User(req.body)
            const newUser = await user.save()
            res.status(200).json(newUser)
        }
        res.status(400).send(error);
    })

router.route('/:id')
    .get(async (req,res)=>{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    })
    .put(bodyParser.json(), Admin, async (req,res)=>{
        const {error} = updateUserSchema.validate(req.body)
        if(!error){
            const result = await User.findByIdAndUpdate(req.params.id,req.body)
            res.status(200).send(result)
        }
        res.status(400).send(error);
    })
    .delete(Admin, async (req,res)=>{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send("User deleted")
    })



    
router.post('/login', async (req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) 
        res.status(404).send("User not found");
    else
    bcrypt.compare(password, user.password, (err,result)=>{
        if(err){
            res.status(400).json({message:"Invalid Credentials"})
        }
        req.session.user = user;
        res.status(200).json({ message: "User Logged in Successfully" })
    })

})

router.post('/logout',async (req,res)=>{
    req.session.destroy();
    res.send("User logged out")
})

module.exports = router;