// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// // https://ant-design.gitee.io/docs/react/introduce-cn
// // 按需引入
// import { DatePicker,Button,Icon } from 'antd';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//         {/* 日期选择器 */}
//         <DatePicker />
//         <Button type="danger">Button<Icon type="search"></Icon></Button>

//       </div>
//     );
//   }
// }
// export default App;


import React, { Component } from 'react';
import './App.css';
import {connect} from "react-redux"
import {queryMusicList} from "./store/action"

// 导入三个组件
import MusicList from "./components/musicList/MusicList"
import ControlBox from "./components/controlBox/ControlBox"
import LyricBox from "./components/lyricBox/LyricBox"

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* 展示CD */}
        <div className="App-cd App-cd-spin" style={this.cdStyle()}>
          <div className="App-cd-hole"></div>
        </div>
        {/* 播放器的主界面 */}
        <div className="App-play-box">
          <MusicList />
          <div className="App-play-right">
            <LyricBox />
            <ControlBox />
          </div>
        </div>
      </div>
    );
  }
  componentDidMount(){
    this.props.queryMusicList();
  }
  cdStyle=()=>{
    return{
      "animationPlayState": this.props.playing?"running":"paused",
      // encodeURI() 函数可把字符串作为 URI 进行编码(该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) )。
      "backgroundImage": `url("./music/${encodeURI(this.props.musicList[this.props.index])}.jpg")`
    }
  }
}

let mapState = (states)=>{
  return {
    musicList: states.musicList,
    playing: states.playing,
    index: states.currentPlayIndex
  }
}
let mapAction = dispatch=>{
  return{
    queryMusicList(){
      dispatch(queryMusicList());
    }
  }
}
export default connect(mapState,mapAction)(App);