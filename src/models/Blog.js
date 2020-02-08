const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        refs:'users'
    },
    uId:{
        type:String,
        required:true    
    },
    bloggerId: mongoose.Types.ObjectId,
    image: String,
    title: {
        type:String,
        required:true
    },
    text: String,
    details: String,
    likes:[
        {
            reacterId:{
                type:mongoose.Schema.Types.ObjectId,
                refs:'users'
            }
        }     
    ],
    comments:[
        {
            commenterId:{
                type:mongoose.Schema.Types.ObjectId,
                refs:'users'
            } , 
            commenterName:String,
            comment:String,
            createDateTime:Date,
            deleteDateTime:Date
        }
    ],
    createDateTime: Date,
    updateDateTime: Date,
    deleteDateTime: Date,
    status: Boolean
});


module.exports = mongoose.model('Blog', BlogSchema);