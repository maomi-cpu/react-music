import React, { Component } from 'react';
import './ControlBox.css';
import {connect} from "react-redux"
import {setPlayer,setCurrentTime,setPlaying,setCurrentPlayIndex,queryLyric} from "../../store/action"
import {Slider,Icon,Popover} from "antd"

class ControlBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress: 0,
      musicDuration: "00:00"
    }
    // 把audio标签对象存到当前组件对象中
    this.player = React.createRef();
  }
  render() {
    let pop = <div style={{height:"100px"}}>
      <Slider vertical step={1} defaultValue={50} onChange={this.soundClick} />
    </div>;
    return (
      <div className="ControlBox">  
        <div className="ControlBox-progress">
            <Slider step={0.01} value={this.state.progress} onChange={this.progressChange} />
            <p>{this.secondToMinute(this.props.currentTime)}/{this.state.musicDuration}</p>
        </div>
        <div className="ControlBox-control">
          <div>
            <Icon type="step-backward" onClick={this.backwardClick} />
          </div>
          <div>
            <Icon type={this.props.playing?"pause-circle":"play-circle"} onClick={this.playOrPauseClick} />
          </div>
          <div>
            <Icon type="step-forward" onClick={this.forwardClick} />
          </div>
          <div>
            <Popover placement="top" content={pop}>
             <Icon type="sound" />
            </Popover>
          </div>
        </div>
        {/* 播放器 */}
        <audio ref={this.player} src={`/music/${this.props.musicList[this.props.index]}.mp3`}></audio>
      </div>
    );
  }
  // 当接收到来自父组件传参时调用 | 当props中的值发生变化时调用（update当state中的数据发生变化）
  // componentWillReceiveProps(){
  //   if (typeof(this.props.test) !== "number") {
  //     console.error("we nedd index type is Number But you send string");
  //   }
  // }

  componentDidMount(){
    // 把播放器对象放到store中
    this.props.setPlayer(this.player.current);
    this.player.current.volume = 0.5;
    
    // 当歌曲暂停时的回调函数
    this.player.current.onpause = ()=>{
      // console.log("歌曲暂停");
      this.props.setPlaying(false);
    }
    // 当歌曲播放时的回调函数
    this.player.current.onplay = ()=>{
      console.log("歌曲播放");
      this.props.setPlaying(true);
    }
    // 当歌曲可以播放时的回调函数
    this.player.current.oncanplay = ()=>{
      // console.log("歌曲可以播放");
      this.setState({musicDuration:this.secondToMinute(this.player.current.duration)});
      // 歌曲准备好了，可以播放了，那么就开始下载歌词
      this.props.queryLyric(`/music/${this.props.musicList[this.props.index]}.lrc`);
    }
    // 当歌曲播放进度更新时的回调函数
    this.player.current.ontimeupdate = ()=>{
      // console.log("歌曲播放进度更新");
      this.props.setCurrentTime(this.player.current.currentTime);
      this.setState({
        progress: this.player.current.currentTime/this.player.current.duration*100
      });
    }
    // 当歌曲播放完毕时的回调函数
    this.player.current.onended = ()=>{
      // console.log("歌曲播放完毕");
      if (this.props.playStyle === "single") {
        this.player.current.play();
      }else{
        this.forwardClick();
      }
    }
  }
  progressChange=(v)=>{
    /// console.log(v);
    this.setState({
      progress: v
    });
    this.player.current.currentTime = v/100*this.player.current.duration;
  }
  // 上一首
  backwardClick=()=>{
    let index = 0;
    if (this.props.playStyle==="order" || this.props.playStyle==="single") {
      index = this.props.index?this.props.index-1:this.props.musicList.length-1;
    } else if(this.props.playStyle === "random") {
      let temp = this.props.randomList.indexOf(this.props.index);
      index = temp?temp-1:this.props.randomList.length-1;
      index = this.props.randomList[index];
    }
    this.props.setCurrentPlayIndex(index);
    console.log(index)
    setTimeout(()=>{
      this.player.current.play();
    },50);
  }
  // 播放暂停
  playOrPauseClick=()=>{
    // this.player.current.paused true表示正在暂停 false表示正在播放
    if (this.player.current.paused) {
      this.player.current.play();
    }else{
      this.player.current.pause();
    }
  }
  // 下一首
  forwardClick=()=>{
    let index = 0;
    if (this.props.playStyle==="order" || this.props.playStyle==="single") {
      index = this.props.index===this.props.musicList.length-1?0:this.props.index+1;
    } else if(this.props.playStyle === "random") {
      let temp = this.props.randomList.indexOf(this.props.index);
      index = temp===this.props.randomList.length-1?0:temp+1;
      index = this.props.randomList[index];
    }
    this.props.setCurrentPlayIndex(index);
    console.log(index)
    setTimeout(()=>{
      this.player.current.play();
    },50);
  }
  // 声音
  soundClick=(v)=>{
    this.player.current.volume = v/100;
  }

  // 把秒转成分钟
  secondToMinute=(second)=>{
    let m = Math.floor(second / 60);
    let s = Math.round(second % 60);
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return m + ":" + s;
  }
}

let mapState = (states)=>{
  return {
    musicList: states.musicList,
    index: states.currentPlayIndex,
    currentTime: states.currentTime,
    playing: states.playing,
    randomList: states.randomList,
    playStyle: states.playStyle,
  }
}
let mapAction = dispatch=>{
  return{
    setPlayer(ad){
      dispatch(setPlayer(ad));
    },
    setCurrentTime(time){
      dispatch(setCurrentTime(time));
    },
    setPlaying(t){
      dispatch(setPlaying(t));
    },
    setCurrentPlayIndex(index){
      dispatch(setCurrentPlayIndex(index));
    },
    queryLyric(url){
      dispatch(queryLyric(url));
    }
  }
}
export default connect(mapState,mapAction)(ControlBox);