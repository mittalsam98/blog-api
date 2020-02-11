var mongoose = require('mongoose');

const typeAndReq={
    type:String,
    required:true,
}

var userSchema = new mongoose.Schema({
  uId:  String,
  email: typeAndReq,
  name:   typeAndReq,
  role:typeAndReq,
  imgPath:String
});

module.exports=User=mongoose.model('User',userSchema)