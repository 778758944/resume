/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-03 09:50:06
 * @version $Id$
 */

var main=require("../lib/main");
module.exports=function(app){
	var router=app.loopback.Router();
	router.get("/test",function(req,res){
		res.end("hello world");
	});
	router.post("/uploadcomment",main.commentUpload);
	router.get("/getComment",main.getComment);

	app.use(router);
}
