import axios from "axios"

function setMusicList(list){
    return{
        type: "SET_MUSIC_LIST",
        list: list
    }
}

function setRandomList(list){
    return{
        type: "SET_RANDOM_LIST",
        list: list
    }
}

// 异步读取本地歌曲信息
function queryMusicList(){
    return dispatch=>{
        var p = axios.get("/music/music-list.json");
        p.then(res=>{
            // console.log(res.data);
            dispatch(setMusicList(res.data.list));
            // 同时在这里产生一个随机播放的列表
            let rl = [];
            for (let i = 0; i < res.data.list.length; i++) {
                rl.push(i);
            }
            rl = rl.sort(()=>{
                return Math.floor(Math.random()*3)-1;
            });
            dispatch(setRandomList(rl));
        });
        return p;
    }
}

function setPlaying(value){
    return{
        type: "SET_PLAYING",
        value
    }
}

function setCurrentPlayIndex(value){
    return{
        type: "SET_INDEX",
        value
    }
}

function setPlayStyle(value){
    return{
        type: "SET_PLAYSTYLE",
        value
    }
}

function setPlayer(value){
    return{
        type: "SET_PLAYER",
        value
    }
}

function setCurrentTime(value){
    return{
        type: "SET_CURRENTTIME",
        value
    }
}

// 同步给歌词状态赋值
function setLyric(value){
    return{
        type: "SET_LYRIC",
        value
    }
}

// 异步请求歌词信息并解析
function queryLyric(url){
    return dispatch=>{
        return axios.get(url).then(res=>{
            // console.log(res.data);
            let txt = res.data;
            let reg = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/g;
            let ra = null;
            let temp = [];
            while(!!(ra = reg.exec(txt))){ 
                // console.log(ra);
                let time = ra[1]*60 + ra[2]*1 + ra[3]*1/100;
                let content = ra[4];
                temp.push({time,content});
            }
            dispatch(setLyric(temp));
        })
    }
}

export {
    queryMusicList,
    setPlaying,
    setCurrentPlayIndex,
    setPlayStyle,
    setPlayer,
    setCurrentTime,
    queryLyric
}