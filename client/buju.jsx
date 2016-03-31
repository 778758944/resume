/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-15 19:41:09
 * @version $Id$
 */
import React from 'react'
var back_img=require('./img/amazon.png');
var ad_img=require('./img/ad.jpg');
var $=require('./js/jquery.js');
var back_img2=require('./img/amazon2.png');
var github_img=require('./img/github.jpg');
var arrow=require("./index.png");

import * as tool from "./tool"




class ImageIna extends React.Component{
	render(){
		return (
			
				<a className='img_wrap_a' href={this.props.url} target='_blank'>
					<img src={this.props.img} className='img_wrap_in' width={this.props.w} height={this.props.h}/>
				</a>
			)
	}
}


class CenterAuto extends React.Component{
	render(){
		return (
			<div className='center_wrap' style={{height:this.props.height}}>
				<div className='center_left' style={{width:this.props.left_w}}>
					<div className='logo' style={{backgroundImage:'url('+back_img+')'}}>

					</div>
				</div>
				<div className='center_mid'>
					<form className='bs-example bs-example-form' role='form' id='search_form'>
						<div className='input-group'>
							<span className='input-group-addon'>个人简历<span className='caret'></span></span>
							<input type="text" className='form-control'/>
							<span className='input-group-addon' id='sub'>
								<span className='glyphicon glyphicon-search search_icon'></span>
							</span>
						</div>
					</form>
				</div>
				<div className='center_right' style={{width:this.props.right_w}}>
					<ImageIna w='370' h='39' url='#' img={ad_img}/>
				</div>
			</div>
			)
	}
}

class Project extends React.Component{
	constructor(props){
		super(props);
		this.state={
			load:false,
			data:"",
			width:"165px",
			index:0
		}
		this.handle_hover=function(e){
			if(e.target.tagName=="A"||e.target.tagName=="LI"){
				var index=e.target.dataset['index'];
				this.setState({
					index:index,
					width:"715px"
				})
			}
		}.bind(this);
	}

	componentWillMount(){
		var that=this;
		var ele;
		var loop=function(){
			// console.log(typeof($(ele).width()));
			if($(ele).css("display")=="none" && $(ele).width()>200){
				that.setState({
					width:"165px"
				})
			}
			requestAnimationFrame(loop);
		}
		$.get("/project.json",function(data){
			that.setState({
				load:true,
				data:data
			});
			ele=that.refs.project;
			loop();	
		})
	}

	render(){
		var that=this;
		if(!this.state.load){
			return (
				<div>loading</div>
			)
		}
		else{
			var lis=this.state.data.map(function(item,index){
				return (
					<li data-index={index} onMouseOver={that.handle_hover} key={index}>
						<a href='javascript:' data-index={index}>{item.proname}</a>
						<img src={arrow} className="arrowImage"/>
					</li>
					)
			})
			return (
				<div className="projectWrap" style={{width:this.state.width}} ref="project">
					<span className="caret project_big"></span>
					<span className="caret project_small"></span> 
					<div className="projectInner_wrap">
						<ul className="projectWrap_list">
							{lis}
						</ul>
						<ProjectDetail data={this.state.data[this.state.index].data}/>
					</div>
				</div>
				)
		}
	}
}

class ProjectDetail extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		// console.log(this.props.data.link.substring(-1,3));
		var link=this.props.data.link;
		var len=link.length;
		var flag=link.substring(link.length-3);
		if(flag=='png'){
			// var qrcode=require(link);
			var link_opt=(<img src={link} className="qrcodeImage"/>)
		}
		else{
			var link_opt=(<a href={link} target="_blank" className="projectLink">{link}</a>)
		}
		return (
			<div className="projectDetail_wrap" style={{backgroundImage:'url('+this.props.data.back+')'}}>
				<h2>{this.props.data.name}</h2>
				<div className="projectDetail_inner">
					<div className="projectDetail_inner_item">
					    <span>项目描述：</span>
					    <div>{this.props.data.describe}</div>
					</div>
					<div className="projectDetail_inner_item">
						<span>责任范围：</span>
						<div>{this.props.data.myjob}</div>
					</div>
					<div className="projectDetail_inner_item">
						<span>所用技术：</span>
						<div>{this.props.data.skills}</div>
					</div>
					<div className="projectDetail_inner_item">
						<span>链接：</span>
						<div>
							{link_opt}
						</div>
					</div>
				</div>
			</div>
			)
	}
}

class CenterMenu extends React.Component{
	constructor(props){
		super(props);
		this.state={
			show:"none"
		},
		this.handler=function(e){
			e.preventDefault();
			e.stopPropagation();
			// console.log(e.target.className);
		}
	}
	render(){
		return (
			<div className='center_wrap center_wrap2' style={{height:this.props.height,backgroundImage:'url('+back_img+')'}}>
				<div className='center_left' style={{width:this.props.left_w}}>
					<div className='all_parts'>
						<div><span className='all_small'>浏览</span></div>
						<div><span className='all_large'>全部项目浏览</span><span className='caret'></span>
							<Project show={this.state.show}/>
						</div>
					</div>
				</div>
				<div className='center_mid'>
					<div className='menu_wrap'>
						<div className='bs-js-navbar-scrollspy' id='spyon'>
							<ul className='nav'>
								<li><a href='#myshort'>我的简介</a></li>
								<li><a href="#front_skill">前端技能</a></li>
								<li><a href="#other_skill">其他技能</a></li>
								<li><a href="#myinfo">基本信息</a></li>
								<li><a href="#comments">雇主评价</a></li>
							</ul>
						</div>
					</div>
				</div>
				<div className='center_right' style={{width:this.props.right_w}}>
					<div className='tool_wrap'>
						<div className='tool_account'>
							<div><span className='all_small'>您好,登录</span></div>
						    <div><span className='all_large'>我的账户</span><span className='caret'></span></div>
						</div>
						<div className='tool_cart'>
							<div>
								<span className='show_cart' style={{backgroundImage:'url('+back_img+')'}}></span>
								<span className='all_large'>购物车</span>
							</div>
						</div>
						<div className='tool_wish'>
							<div><span className='all_small'>&nbsp;</span></div>
							<div><span className='all_large'>心愿单</span><span className='caret'></span></div>
						</div>
					</div>
				</div>
			</div>
			)
	}
}

var ShowImg = React.createClass({
	getInitialState(){
		return {
			showBig:"",
			index:0
		}
	},

	componentWillMount(){
		this.small_arr=[require('./img/small-1.jpg'),require('./img/small-2.jpg'),require('./img/small-3.jpg'),require('./img/small-4.jpg')];
        this.big_img=[require('./img/big-1.jpg'),require('./img/big-2.jpg'),require('./img/big-3.jpg'),require('./img/big-4.jpg')];
	},

	componentDidMount(){
		var index=this.props.imgIndex;
		this.setState({
			showBig:this.big_img[index],
			index:index
		})
	},
	fromProp:false,

    shouldComponentUpdate:function(nextProps,nextState){//在props和state变化调用
		if(this.props.imgIndex!=nextProps.imgIndex){
			this.fromProp=true;
		}
		else{
			this.fromProp=false;
			// this.props.imgIndex=nextState.index;
		}
		return true;
	},

	handle_hover(e){
		// e.preventDefault();
		// e.stopPropagation();
		var li=$(e.target);
		var index=e.target.dataset['index'];
		var image=this.big_img[index];
		this.setState({
			showBig:image,
			index:index
		})
	},

	render(){
		var that=this;
		var img;
		if(this.fromProp){
			// console.log("props");
			img=(<img src={this.big_img[this.props.imgIndex]}/>);
			var smalls=this.small_arr.map(function(url,index){
				if(index==that.props.imgIndex){
					return (
						<li key={index} data-index={index} onMouseOver={that.handle_hover} className={'selected'}>
						   <img src={url} width={38} data-index={index}/>
					    </li>
						)
				}
				else {
					return (
					<li key={index} data-index={index} onMouseOver={that.handle_hover}>
						<img src={url} width={38} data-index={index}/>
					</li>
					)

				}
			})
		}
		else{
			// console.log("state");
			// this.props.imgIndex=this.state.index;

			img=(<img src={this.state.showBig} />);
			var smalls=this.small_arr.map(function(url,index){
				if(index==that.state.index){
					return (
						<li key={index} data-index={index} onMouseOver={that.handle_hover} className={'selected'}>
						   <img src={url} width={38} data-index={index}/>
					    </li>
						)
				}
				else {
					return (
					<li  key={index} data-index={index} onMouseOver={that.handle_hover}>
						<img src={url} width={38} data-index={index}/>
					</li>
					)

				}
			})
		}

		return(
			<div className='img_show'>
				<ul className='small_img_show'>
					{smalls}
				</ul>
				<div className='big_img_big'>
					{img}
				</div>
			</div>
			)
	}

});

var MainInfo=React.createClass({
	getInitialState(){
		return {
			load:false,
			basezz:""
		}
	},
	componentWillMount(){
		var that=this;
		$.get('./maininfo.json',function(data){
			that.data=data;
			$.get("./comment.json",function(data){
				var len=data.length,
				    all=0,
				    avg;
				for(var i=0;i<len;i++){
					all=all+data[i].star;
				}
				avg=all/len;
				var reg=/^[1-5]$/;

				if(!reg.test(avg)){
					var tmp_avg=Math.round(avg);
					if(tmp_avg<avg){
						tmp_avg=tmp_avg+0.5;
					}
					avg=tmp_avg;
				}


				var star_pos=tool.getStar(avg,-5,-175,"-368px",16);



				that.setState({
					load:true,
					place_selected:that.data.place[0].available,
					basezz:that.data.base[0],
					comment:len,
					starpos:star_pos
				});


			})

		})
	},
	handle_change(e){
		// console.log(typeof e.target.value)
		this.setState({
			place_selected:e.target.value
		})
	},
	handle_hover(e){
		var index=parseInt(e.target.dataset['index'])+1;
		// console.log(index);
		this.props.handler(this.props.that,index);
		this.setState({
			basezz:e.target.innerHTML
		})
	},
	render(){
		if(!this.state.load){
			return (
				<div>loading</div>
				)
		}
		else{
			var job_place=this.data.place.map(function(data,index){
				return (
					<option value={data.available} key={index}>{data.city}</option>
					)
			});
			var that=this;
			var base_opt=this.data.base.map(function(data,index){
				return (
					<div key={index} className="base_opt" onMouseOver={that.handle_hover} data-index={index}>{data}</div>
					)
			});
			if(this.state.place_selected=='true'||this.state.place_selected==true){
				var aviable=(<span className='avaible yes_avaible'>现在有货</span>)
			}
			else{
				var aviable=(<span className='avaible no_avaible'>现在无货</span>)
			}
			return (
				<div className="info_wrap">
					<div className="info_header">
						<h2>{this.data.keyword}</h2>
						<div className="info_header_bottom">
							<div className="starwrap">
								<span className="skill_star" style={{backgroundImage:'url('+back_img2+')',backgroundPosition:this.state.starpos}}></span><span className="caret"></span>
							</div>
							<div className="info_comments info_link"><a href="javascript:">{this.state.comment}条雇主评论</a></div>
							<div className="info_share info_link">分享<ImageIna w='17' h='17' url='https://github.com/778758944' img={github_img}/></div>
						</div>
					</div>
					<div className='salary'>
						<div>
							<span>期望薪资：</span><span className='money'>¥{this.data.salary}</span>
							<span className='salary_bz'><b>月薪</b>且为<b>税后</b></span>
						</div>
					</div>

					<div className='info_js'>
						<div className="rzdate">
							<span className="rzdate_span">基本资质：</span>
							<div className="line_div">
								<span className="base_font">{this.state.basezz}</span>
							</div>
							<div className="base_opt_wrap">
								{base_opt}
							</div>
						</div>
						<div className='form-group'>
							<span>工作地点：</span>
							<select onChange={this.handle_change} className='infojs_sel form-control'>
								{job_place}
							</select>
							{aviable}
						</div>
						<div className='rzdate'>
							<span className="rzdate_span">工作经验：</span>
							<div className="line_div">
								<span>{this.data.experience}</span>
							</div>
						</div>
						<div className='rzdate'>
							<span className='rzdate_span'>入职日期：</span>
							<div className="line_div">
								<span>{this.data.comingdate}，如有意向请尽早安排面试以便尽快入职</span>
							</div>
							<div className='redate_bz'><span>(精确入职之间以实际面试情况为准)</span></div>
						</div>
						<div className='rzdate'>
							<span className="rzdate_span">承诺：</span>
							<div className='line_div'>
								<span className='promise miaoshu'>{this.data.promise}</span>
							</div>
						</div>
					</div>
					<div></div>
				</div>
				)
		}
	}
})

var ConnectBox=React.createClass({
	showTel(){
		alert('电话：13291803416');
	},
	render(){
		return (
			<div className='connect_wrap'>
				<div>
					<button className='btn tel' onClick={this.showTel}><i className='tel_icon' style={{backgroundImage:'url('+back_img2+')'}}></i>预约面试</button>
				</div>
				<div>
					<a className='btn tel down' href='/xingwentao_resume.docx'><span className='glyphicon glyphicon-arrow-down'></span>下载纸质简历</a>
				</div>
			</div>
			)
	}
});

var SkillInfo=React.createClass({
	render(){
		var stars=this.props.stars;
		var star_pos=tool.getStar(stars,-5,-175,"-368px",16);
		return (
			<div className="skillinfo_wrap" style={{margin:"0px "+this.props.space+"px"}}>
				<a className='skill_wrapa' title={this.props.skillDes}>
					<div className='skill_img_wrap'>
						<img src={this.props.img} width={160}/>
					</div>
					<h5>{this.props.skillName}</h5>
					<p>{this.props.skillDes}</p>
					<div className="skill_star" style={{backgroundImage:'url('+back_img2+')',backgroundPosition:star_pos}}></div>
				</a>
			</div>
			)
	}
})

var Skill=React.createClass({
	getInitialState(){
		return {
			load:false,
			data:[],
			total_page:0,
			now_page:0,
			pagesize:0,
			skill_width:0,
			skill_space:0,
			ifshow:"block"
		}
	},
	justClick:false,
	resizeHandle(){

		var width=$('.skill_base_bottom').width()||(document.body.scrollWidth-22);
		// 技能区域剩下的宽度
		var skill_wrap_width=width-(10+34)*2;
		// 以前一个页面有几项技能
		var old_pagesize=this.state.pagesize;
		// 当前所在的页面
		var nowpage=this.state.now_page;
		// 现在一个页面放几个技能,间距最小是7,所以除以174
		var new_pagesize=Math.floor(skill_wrap_width/174);
		if(new_pagesize>=this.data.length){
			var len=this.data.length;
			var skill_space=(skill_wrap_width-160*len)/(len*2)-1;
			this.setState({
				load:true,
				skill_width:skill_wrap_width+"px",
				pagesize:this.data.length,
				data:this.data,
				total_page:1,
				now_page:1,
				skill_space:skill_space,
				ifshow:"none"
			})
			return;
		}
		var skill_space=(skill_wrap_width-160*new_pagesize)/(new_pagesize*2)-1;
		var totalpage=Math.ceil(this.data.length/new_pagesize);
		if(nowpage==0){
			var nowpage=1;
		}
		if(this.justClick){
			this.start=(nowpage-1)*old_pagesize;
		}
		this.justClick=false;
		var start=this.start;
		// console.log(start);
		if(nowpage==totalpage){
			var showdata=this.data.slice(start);
		}
		else{
			var showdata=this.data.slice(start,new_pagesize*nowpage);
		}

		this.setState({
			load:true,
			skill_width:skill_wrap_width+"px",
			pagesize:new_pagesize,
			skill_space:skill_space,
			data:showdata,
			total_page:totalpage,
			now_page:nowpage,
			ifshow:"block"
		})
	},
	toRight(){
		this.justClick=true;
		var nowpage=this.state.now_page+1;
		var pagesize=this.state.pagesize;
		var totalpage=this.state.total_page;
		var len=this.data.length;
		var end=pagesize*nowpage;
		if(nowpage>totalpage){
			nowpage=1;
			showdata=this.data.slice(0,pagesize);
		}
		else{
			if(end>len){
				var showdata=this.data.slice((nowpage-1)*pagesize,len);
			}
			else{
				var showdata=this.data.slice((nowpage-1)*pagesize,nowpage*pagesize);
			}
		}
		this.setState({
			data:showdata,
			now_page:nowpage
		});	
	},
	toLeft(){
		this.justClick=true;
		var nowpage=this.state.now_page-1;
		var pagesize=this.state.pagesize;
		var totalpage=this.state.total_page;
		if(nowpage<1){
			nowpage=totalpage;
			var showdata=this.data.slice((nowpage-1)*pagesize);
		}
		else{
			var showdata=this.data.slice((nowpage-1)*pagesize,nowpage*pagesize);
		}
		this.setState({
			now_page:nowpage,
			data:showdata
		})
	},
	toFirst(){
		this.justClick=true;
		var pagesize=this.state.pagesize;
		var showdata=this.data.slice(0,pagesize);
		this.setState({
			now_page:1,
			data:showdata
		})
	},
	componentDidMount(){
		window.addEventListener("resize",this.resizeHandle,false);
	},
	componentWillMount(){
		var that=this;
		var dataUrl=this.props['data_url'];
		$.get(dataUrl,function(data){
			that.data=data;
			that.resizeHandle();
		})
	},
	render(){
		var that=this;
		if(this.state.load){
			// var img=require(this.state.data[0].img);

			var skillinfos=this.state.data.map(function(data,index){
				return (
				<SkillInfo key={index} img={data['img']} skillName={data['skill_name']} skillDes={data['describe']} stars={data['star']} space={that.state.skill_space}/>
				)
			});

			var show=this.state.now_page==1? "none":"inline-block";
			return (
				<div>
					<div className="skill_base">
						<span className="skill_title">{this.props.title}</span>
						<div className="skill_page">
							<span>第{this.state.now_page}页，</span>
							<span>共{this.state.total_page}页</span>
							<a className="skill_to_first" onClick={this.toFirst} style={{display:show}}>第一页</a>
						</div>
					</div>
					<div className='skill_base_bottom'>
						<div className="skill_wrap" style={{width:this.state.skill_width}}>
							{skillinfos}
						</div>
						<div className="skillLeft" onClick={this.toLeft} style={{display:this.state.ifshow}}>
							<span style={{backgroundImage:'url('+back_img2+')'}}></span>
						</div>
						<div className="skillRight" onClick={this.toRight} style={{display:this.state.ifshow}}>
							<span style={{backgroundImage:'url('+back_img2+')'}}></span>
						</div>
					</div>
				</div>
				)
		}
		else{
			return (
				<div>
					loading
				</div>
			)
		}
	}
});

var BaseInfo=React.createClass({
	getInitialState(){
		return {
			baseinfo:{},
			load:false
		}
	},
	componentWillMount(){
		var that=this;
		$.get("/baseinfo.json",function(data){
			that.setState({
				load:true,
				baseinfo:data
			})
		})
	},
	render(){
		if(this.state.load){
			var keys=Object.keys(this.state.baseinfo);
			var that=this;
			var items=keys.map(function(val,index){
				return (
					<div key={index} className="baseinfo_item"><span>{val}：{that.state.baseinfo[val]}</span></div>
					)
			})
			return (
			<div>
				<div className="skill_base">
					<span className="skill_title">基本信息</span>
				</div>
				<div className="baseinfo_wrap">
					{items}
				</div>
			</div>
			)
		}
		else{
			return (
				<div>loading</div>
				)
		}
	}
});

var CommentSummary=React.createClass({
	getInitialState(){
		return {
			avg:0,
			stars:[]
		}
	},
	componentWillMount(){
		var data=this.props.comments;
		var len=data.length;
		var sum=0;
		var star_sum=[0,0,0,0,0];
		for(var i=0;i<len;i++){
			sum+=data[i].star;
			star_sum[data[i].star-1]+=1;
		}

		var avg=sum/len;
		var reg=/^[1-5]&/;
		if(!reg.test(avg)){
			var tmp_avg=Math.round(avg);
			if(tmp_avg<avg){
				tmp_avg=tmp_avg+0.5;
			}
			avg=tmp_avg;
		}
		// for(var j=0;j<star_sum.length;j++){
		// 	star_sum[j]=star_sum[j]/len*100+"%";
		// }
		this.setState({
			avg:avg,
			stars:star_sum,
			comments_sum:len
		})
	},
	render(){
		//-5 -205 -396px 20;
		var avg_pos=tool.getStar(this.state.avg,-5,-205,"-396px",20);
		// console.log(avg_pos);
		var len=this.state.comments_sum;
		var star_items=this.state.stars.reverse().map(function(data,index){
			var precent=data/len*100+"%";
			return (
				<a className="star_detail_a" key={index}>
					<span>{5-index}星</span>
					<span className="star_precent_wrap">
						<i className="star_precent" style={{width:precent}}></i>
					</span>
					<span>{data}</span>
				</a>
				)
		})
		return (
			<div>
				<div className="comment_avg">
					<div>
						<span className='comment_avg_star' style={{backgroundImage:"url("+back_img2+")",backgroundPosition:avg_pos}}></span>
					</div>
					<p className="comments_avg_text">平均{this.state.avg}星</p>
				</div>
				<div className="star_detail">
					{star_items}
					<a className="total_comments">总共{len}条评论</a>
				</div>
			</div>
			)
	}
});

var CommentContent=React.createClass({
	getInitialState(){
		return {
			data:[],
			pos:""
		}
	},
	componentWillMount(){
		var stars=this.props.comments.star;
		var star_pos=tool.getStar(stars,-5,-175,"-362px",16);
		this.setState({
			data:this.props.comments,
			pos:star_pos
		})
	},
	render(){
		var time=this.state.data.time.substring(0,10);
		return (
			<div className="comment_all">
				<div className="comment_line1">
					<span className="skill_star" style={{backgroundImage:"url("+back_img2+")",backgroundPosition:this.state.pos}}></span>
					<span className="comment_title">{this.state.data.title}</span>
				</div>
				<div className="comment_line2">
					<span className="comment_author">评论者
					 	<a>{this.state.data.name}</a>
					 	评论于{time}
					</span>

				</div>
				<div className="comment_line3">
					<span className="comment_company">公司名称:{this.state.data.company}</span>
					<span className="comment_long">供职时间:{this.state.data.workTime}</span>
				</div>
				<div className="comment_line4">
					{this.state.data.desc}
				</div>
			</div>
			)
	}
})

var CommentBox=React.createClass({
	getInitialState(){
		return {
			load:false,
			comments:[]
		}
	},
	componentWillMount(){
		var that=this;
		$.get("/getComment",function(data){
			that.setState({
				load:true,
				comments:data
			})
		});
	},
	render(){
		var comment_content=this.state.comments.map(function(data,index){
			return (
				<CommentContent comments={data} key={index}/>
				)
		})
		if(this.state.load){
			return(
				<div className="comment_out_wrap">
					<div className="skill_base">
						<span className="skill_title">雇主评价(测试数据)</span>
					</div>
					<div className='comment_main_wrap'>
						<div className="comment_summary">
							<CommentSummary comments={this.state.comments}/>
						</div>
						<div className='comment_items'>
							{comment_content}
						</div>
					</div>
				</div>
				)
		}
		else{
			return (
				<div>
					loading
				</div>
				)
		}
	}
})


class MainShow extends React.Component{
	constructor(props){
		super(props);
		this.state={
			img_index:0,
		}
	}

	componentDidMount(){
		// console.log(this.state);
		// console.log(this.props.children);
	}

	handle_change(that,index){

		that.setState({
			img_index:index
		})
	}

	handler_img(that){
		var index=that.props.imgIndex;
		that.setState({
			showBig:this.big_img[index],
			index:index
		})
	}


	render(){
		return(
			<div className='MainShow_wrap'>
				<div className='mainShow_left'>
					<div className='mainShow_img'>
						<ShowImg imgIndex={this.state.img_index} handler={this.state.handler_img}/>
					</div>
					<div className='mainShow_info'>
						<MainInfo handler={this.handle_change} that={this}/>
					</div>
				</div>
				<div className="mainShow_right">
					<ConnectBox/>
				</div>
			</div>
			)
	}
}

export {CenterAuto,MainShow,CenterMenu,Skill,BaseInfo,CommentBox}



































