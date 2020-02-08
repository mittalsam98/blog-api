const express = require('express');
const Blog = require('../models/Blog');
const User = require('../models/Users');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res, next) => {
    Blog
        .find()
        .then(docs => {
            const response = {
                count: docs.length,
                blog: docs.map(doc => {
                    return {
                        title: doc.title,
                        text: doc.text,
                        details: doc.details,
                        _id: doc.id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8080/blog/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        }).catch(err => {

        });
});

router.post('/', (req, res, next) => {
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        uId: req.body.uId,
        user:req.body.id,
        bloggerId: new mongoose.Types.ObjectId(),
        image: req.body.image,
        title: req.body.title,
        text: req.body.text,
        details: req.body.details,
        createDateTime: new Date,
        status: req.body.status
    });
    blog.save().then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })

});

router.get('/:blogId', (req, res, next) => {
    const id = req.params.blogId;
    Blog.findById(id).then(doc => {
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET all products',
                    url: 'http://localhost:8080/blog/'
                }
            })
        } else {
            res.status(404).json({
                message: 'No valid entry'
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })

});


router.patch('/:blogId', (req, res, next) => {
    const id = req.params.blogId;
    const updateOps = {};
    for (const ops in req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Blog.update({ _id: id }, { $set: updateOps }).exec().then(result => {
        console.log(result);
        res.status(200).json({

            message: 'Blog Updated',
            UpdatedBlog: result,
            request: {
                type: 'GET',
                url: 'http://localhost:8080/blog/' + id
            }
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});


router.delete('/:blogId', (req, res, next) => {
    const id = req.params.blogId;
    Blog.remove({ _id: id }).then(result => {
        res.status(200).json({
            message: 'Blog Deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:8080/blog',

            }
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.post('/like/:id',(req,res)=>{
User.findById(req.body.id)
.then(user=>{
    Blog.findById(req.params.id)
    .then(
        (blog)=>{

        console.log("fas",blog.likes.filter(like=>like.reacterId.toString()===req.body.id),"fsda",blog)

        if(blog.likes.filter(like=>like.reacterId.toString()===req.body.id).length>0){
            return res.status(400).json({msg:'User already liked the post'})
        }

        blog.likes.unshift({reacterId:req.body.id});
        blog.save()
        .then(post=>res.json(post))
        .catch(err=>res.send(err));
    })
})
.catch(err=>res.send(err));
})


router.post('/comment/:id',(req,res)=>{
    User.findById(req.body.id)
    .then(user=>{
        Blog.findById(req.params.id)
        .then(
            (blog)=>{
    
            const comment={
                commenterId:req.body.id,
                comment:req.body.comment,
                createDateTime:new Date
            }
            blog.comments.unshift(comment);
            blog.save()
            .then(post=>res.json(post))
            .catch(err=>res.send(err));
        })
    })
    .catch(err=>res.send(err));
    })
module.exports = router;