/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-14 19:29:22
 * @version $Id$
 */
require('./css/reset.css');
require('./css/bootstrap.css');
// require('./js/bootstrap.js');
require('./style.css');
var back_img=require('./img/amazon.png');


import React from 'react'
import {render} from 'react-dom'
// import {Search} from './zujian.jsx'
import {CenterAuto,MainShow,CenterMenu,Skill,BaseInfo,CommentBox} from './buju.jsx'

$(function(){	
	var WrapBox=React.createClass({
	render:function(){
			return (
				<div>
					<div className='wrap_top'>
						<CenterAuto height='45px' left_w='200px' right_w='400px'/>
						<CenterMenu height='60px' left_w='200px' right_w='400px'/>
					</div>
					<div className='wrap_main' data-spy='scroll' data-target='#spybody' data-offset='0'>
						<div id='myshort'>
							<MainShow/>
						</div>
						<div id='front_skill'>
							<Skill title='前端必备的技能' data_url={'./front_skill.json'}/>
						</div>
						<div id='other_skill'>
							<Skill title='通常希望前端能掌握的其它技能' data_url={'./other_skill.json'}/>
						</div>
						<div id='myinfo'>
							<BaseInfo/>
						</div>
						<div id='comments'>
							<CommentBox/>
						</div>
					</div>
				</div>
				)
		}
	});

    render(<WrapBox/>,document.getElementById('wrap'));

});





