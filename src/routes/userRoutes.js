const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');

const User=require('../models/Users');

router.get('/',(req,res)=>{
    User.find({}, function(err, users) {
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
    
        return res.json(userMap);  
      });
});

router.post('/register',(req,res)=>{
    
    User.findOne({email:req.body.email})
    .then(user=>{
        
        if(user) res.send({msg:'Already Registered'})
        else{

            const userInfo=new User({
                uId: req.body.uId,
                email: req.body.email,
                name: req.body.name,
                role: req.body.role,
                imgPath: req.body.imgPath
            });
        
        userInfo.save()
        .then(resl=>res.status(200).json(resl))
        .catch(err=>res.status(404).send(err))
    }

    })
    .catch(err=>console.log(err))

})

module.exports=router;