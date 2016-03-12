/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-03 09:57:05
 * @version $Id$
 */


var loopback=require("loopback");
var Comment=loopback.findModel("comment");
var formidable=require("formidable");


module.exports={
	commentUpload:function(req,res){
		var form=new formidable.IncomingForm();
		form.parse(req,function(err,fileds,files){
			if(!fileds.id){
				res.end("you don not have the access");
				return;
			}
			console.log(fileds.id);

			Comment.find({where:{id:fileds.id}},function(err,data){
				if(err){
					console.log(err);
				}
				console.log(data.length);
				if(data.length==0){
					res.end('you don not have the access');
					return;
				}
				fileds["time"]=new Date();
				Comment.upsert(fileds,function(err,data){
					if(err){
						console.log(err);
					}
					console.log(data);
					res.end("保存成功");
				})
			})
		})
	},

	getComment:function(req,res){
		Comment.find(function(err,data){
			if(err){
				console.log(err);
				res.end("error occured");
			}
			res.json(data);
		})
	}
}




















