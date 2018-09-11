var express = require('express');
var queryRouter = express.Router();
var mongoose = require('mongoose');
var blog = mongoose.model('blog');

var responseGenerator = require('./../../libs/responsegenerator');
var validator = require('./../../middleware/validate');

var uniqid = require('uniqid');




//  Create Blog
queryRouter.post('/createBlog',validator.blogValidation,function(req,res){

  var blogData = new blog({
        _id       :uniqid(),
  			title 		: req.body.title,
  			body 	    : req.body.body,
        category  :req.body.category
  		});
  		var today = Date.now();
  		blogData.createdAt = today;
      //tags
  		var allTags = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):''
      blogData.tags = allTags;
  		// author
  		var authorData = {fullName: req.body.authorName,email:req.body.authorEmail};
  		blogData.authorInfo = authorData;

  		blogData.save(function(err,result){
  			if(err){
          var response = responseGenerator.generate(true , err , 404, null );
          res.send(response);
  			}
  			else{
          var response = responseGenerator.generate(false , result , 200, null );
  				res.send(response);
  			}
  		});
  	});

queryRouter.get('/viewAllBlogs',function(req,res){
  console.log('here');
  blog.find({},function(err,result){
    if(err){
      var response = responseGenerator.generate(true , err , 404, null );
    }
    else{
      console.log(result);
      var response = responseGenerator.generate(false , result , 200, null );
			res.send(response);
    }
  })
})
queryRouter.get('/viewBlogByCategory/:category',function(req,res){
  console.log('category recieved '+ req.params.category);
  blog.find({category:req.params.category},function(err,result){
    if(err){
      var response = responseGenerator.generate(true , err , 404, null );
      res.send(response);
    }
    else{
      var response = responseGenerator.generate(false , result , 200, null );
			res.send(response);
    }
  })
})

queryRouter.get('/viewBlog/:blogId',function(req,res){
  blog.findOne({_id:req.params.blogId},function(err,result){
    if(err){
      var response = responseGenerator.generate(true , err , 404, null );
      res.send(response);
    }
    else{
          var response = responseGenerator.generate(false , result , 200, null );
          res.send(response);
        }
      })
  })

queryRouter.post('/updateBlog/:blogId',function(req,res){
  var update=req.body;
  blog.findOneAndUpdate({_id:req.params.blogId},update,function(err,result){
    if(err){
      var response = responseGenerator.generate(true , err , 404, null );
      res.send(response);
    }
    else{
       var response = responseGenerator.generate(false , result , 200, null );
       res.send(response);
    }
  })
})

queryRouter.get('/deleteBlog/:blogId',function(req,res){
  blog.remove({_id:req.params.blogId},function(err,result){
    if(err){
      var response = responseGenerator.generate(true , err , 404, null );
      res.send(response);
    }
    else{
       var response = responseGenerator.generate(false , result , 200, null );
       res.send(response);
    }
  })
})

module.exports=queryRouter;
