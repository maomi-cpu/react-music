import React, { Component } from 'react';
import './MusicList.css';
import {connect} from "react-redux"
import {setPlayStyle,setCurrentPlayIndex,setPlaying} from "../../store/action"
import {Icon} from "antd"

class MusicList extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="MusicList">
        <div className="MusicList-play-style">
          <Icon type="retweet" title="顺序" style={{color:this.props.playStyle==="order"?"#65aaf8":"white"}} onClick={()=>{this.props.setPlayStyle("order")}} />
          <Icon type="swap" title="随机" style={{color:this.props.playStyle==="random"?"#65aaf8":"white"}} onClick={()=>{this.props.setPlayStyle("random")}} />
          <Icon type="redo" title="单曲" style={{color:this.props.playStyle==="single"?"#65aaf8":"white"}} onClick={()=>{this.props.setPlayStyle("single")}} />
        </div>  
        <div className="MusicList-list-box">
          {
            this.props.musicList.map((m,i)=>{
              return(
                <div key={i} className="MusicList-list-item" onClick={()=>{this.musicListItemClick(i)}}>
                  {this.props.index === i && <Icon type="loading" style={{color:"yellow"}} />}
                  <span>{m}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
  
  musicListItemClick = index=>{
    this.props.setCurrentPlayIndex(index);
    setTimeout(()=>{
      this.props.player.play();
    },50);
  }
}

let mapState = (states)=>{
  return {
    playStyle: states.playStyle,
    musicList: states.musicList,
    index: states.currentPlayIndex,
    player: states.player,
  }
}
let mapAction = dispatch=>{
  return{
    setPlayStyle(style){
      dispatch(setPlayStyle(style));
    },
    setCurrentPlayIndex(index){
      dispatch(setCurrentPlayIndex(index));
    },
    setPlaying(t){
      dispatch(setPlaying(t));
    }
  }
}
export default connect(mapState,mapAction)(MusicList);