/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-02 11:55:59
 * @version $Id$
 */
require("./css/reset.css");
require("./css/bootstrap.css");
import React from "react"
import {render} from 'react-dom'
var star=require("./img/star.png");
console.log(star);

$(function(){

	class CommentFrom extends React.Component{

		constructor(props){
			super(props)
			this.state={
				star:"0px",
				name:"",
				worktime:"",
				company:"",
				real_star:""
			};
			var that=this
			this.start_pos=0;
			this.down=false;
			this.handleHover=function(e){
				if(!that.down){
					var mouse_x=e.pageX;
					var ele=e.target;
					if(!that.start_pos){
						that.start_pos=ele.offsetLeft+ele.parentNode.offsetLeft;
					}
					var dif=mouse_x-that.start_pos+"px";
					that.setState({
						star:dif
					})
				}
			};

			this.handleOut=function(){
				if(!that.down){
					that.setState({
						star:"0px"
					})
				}
			}

			this.handleClick=function(){
				that.down=true;
				var num=parseInt(that.state.star.replace("px",""))/21.2;
				var tmp_num=Math.round(num);
				if(tmp_num<num){
					num=tmp_num+0.5;
				}
				else{
					num=tmp_num;
				}
				that.setState({
					star:num*21.2+"px",
					final:num+"星",
					real_star:num
				});
			}
		}

		componentWillMount(){
			var search=location.search.substr(1);
			var arr=search.split("&");
			var obj={};
			for(var i=0;i<arr.length;i++){
				var tmp_arr=arr[i].split("=");
				obj[tmp_arr[0]]=tmp_arr[1];
			}

			this.setState({
				name:obj.name,
				worktime:obj.worktime,
				company:obj.company,
				id:obj.id
			})



		}


		render(){
			return (
				<div className="form-wrap">
					<form className="form-horizontal" role="form" action="/uploadcomment" method="POST">
						<div className="form-group">
							<label for="title" className="col-xs-2 control-label">标题</label>
							<div className="col-xs-10">
								<input type="text" className="form-control" name="title" id="title" placeholder="用几个词总结一下我的贵司的表现"/>
							</div>
						</div>

						<div className="form-group">
							<label for="star" className="col-xs-2 control-label">星级</label>
							<div className="col-xs-10 bottom-color">
								<div className="backColor" >
									<div className="backColor-inner" style={{width:this.state.star}}></div>
								</div>
								<img src={star} height="20" className="front_img" onMouseMove={this.handleHover} onMouseOut={this.handleOut} onClick={this.handleClick}/>
								<div className="star_final">
									{this.state.final}
								</div>
							</div>
						</div>

						<div className="form-group">
							<label for="pl" className="col-xs-2 control-label">评价</label>
							<div className="col-xs-10">
								<textarea type="text" className="form-control" name="desc" id="pl" placeholder="描述一下我在贵司的表现"/>
							</div>
						</div>

						<div className="form-group">
							<div className="col-xs-offset-2 col-xs-10">
								<button type="submit" className="btn btn-primary">提交</button>
							</div>
						</div>
						<input type="hidden" name="star" value={this.state.real_star}/>
						<input type="hidden" name="company" value={this.state.company}/>
						<input type="hidden" name="workTime" value={this.state.worktime}/>
						<input type="hidden" name="name" value={this.state.name}/>
						<input type="hidden" name="id" value={this.state.id}/>
					</form>
				</div>
				)
		}
	}


	render(<CommentFrom/>,document.getElementById("wrap"));
});
