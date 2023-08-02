exports.Auth = (req,res,next)=>{
    const user = req.session.user;
    if(!user)
        res.status(401).send("Unauthorized")
    else next()
}

exports.Admin = (req,res,next)=>{
    const user = req.session.user;
    if(!user || user.role!=2)
        res.status(401).send("Unauthorized")
    else next()
}

exports.Writer = (req,res,next)=>{
    const user = req.session.user;
    if(!user || user.role!=1)
        res.status(401).send("Unauthorized")
    else next()
}

exports.NotAuth = (req,res,next)=>{
    const user = req.session.user;
    if(user)
        res.status(401).send("You are logged in")
    else next()
}