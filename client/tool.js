/**
 * 
 * @authors Your Name (you@example.org)
 * @date    20size-01-31 17:39:30
 * @version $Id$
 */
var getStar=function(stars,startx1,startx2,posy,size){
	var re=/^[1-5]$/;

	if(re.test(stars)){
		var star_pos_x=-(Math.abs(startx1)+size*(5-stars))+"px ";
		var star_pos=star_pos_x+posy;
	}
	else{
		stars=Math.floor(stars);
		var star_pos_x=startx2+(size*(stars-4))+"px ";
		var star_pos=star_pos_x+posy;
	}
	return star_pos;
}


export {getStar}