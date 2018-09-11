//creating user schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var blogSchema = new Schema({
  _id 		             : {type:String,default:'',required:true,},
	title 		           : {type:String,default:'',required:true, unique:true},
	body                 : {type:String,default:''},
  category             : {type:String,default:''},
	tags		             : [],
	createdAt		         : {type:Date},
	lastUpdatedAt        : {type:Date},
	authorInfo           :  {},
});

mongoose.model('blog' , blogSchema);
