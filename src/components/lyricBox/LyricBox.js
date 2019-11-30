import React, { Component } from 'react';
import './LyricBox.css';
import {connect} from "react-redux"
// import {} from "./store/action"

class LyricBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      line: 0
    }
    this.lyricbox = React.createRef();
  }
  render() {
    return (
      <div className="LyricBox" ref={this.lyricbox}>  
        {
          this.props.lyric.map((l,i)=>{
            return (
              <p key={i} className={`"LyricBox-line" ${this.state.line===i&&"LyricBox-line-hl"}`} onClick={()=>{this.lyricClick(l.time)}}>
                  {l.content || "-"}
              </p>
            )
          })
        }
      </div>
    );
  }
  
  componentWillReceiveProps(props){
    // 找到当前时间对应的歌词
    let index = 0;
    for (let i = 0; i < props.lyric.length; i++) {
      if (props.lyric[i].time >= props.currentTime) {
        index = i-1;
        break;
      }
    }
    this.setState({line:index});

    // 歌词滚动
    if (index > 4) {
      index = index - 4;
      // 目标位置
      let target = 45 * index;
      // 目标位置和当前位置的距离
      let distance = target - this.lyricbox.current.scrollTop;
      this.animation(distance,target);
      // this.lyricbox.current.scrollTop = target;
    }else{
      // 目标位置和当前位置的距离
      let distance = 0 - this.lyricbox.current.scrollTop;
      // this.animation(distance,0);
      this.lyricbox.current.scrollTop = 0;
    }
  }
  
  animation = (distance,target)=>{
    let speed = distance / 30;
    // 添加js动画
    let update = ()=>{
      this.lyricbox.current.scrollTop += speed;
      var diff = Math.random(target - this.lyricbox.current.scrollTop);
      if (diff > 1) {
        requestAnimationFrame(update);
      }else{
		this.lyricbox.current.scrollTop = target;  
	  }
    }
    requestAnimationFrame(update);
  }

  lyricClick=(time)=>{
    console.log("xxxxxxx");
    this.props.player.currentTime = time;
  }
}

let mapState = (states)=>{
  return {
    lyric: states.lyric,
    currentTime: states.currentTime,
    player: states.player
  }
}
let mapAction = dispatch=>{
  return{
  }
}
export default connect(mapState,mapAction)(LyricBox);