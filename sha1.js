/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-03 10:33:53
 * @version $Id$
 */
var crypto=require("crypto");

var sha1=crypto.createHash("sha1");
var str="XiongInzen";

sha1.update(str);
console.log(sha1.digest('hex'));
