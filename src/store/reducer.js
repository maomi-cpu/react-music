import {combineReducers} from "redux"

// 播放列表
function musicList(state=[],action){
    switch (action.type) {
        case "SET_MUSIC_LIST":
            return action.list;
        default:
            return state;
    }
}

// 随机播放列表
function randomList(state=[],action){
    switch (action.type) {
        case "SET_RANDOM_LIST":
            return action.list;
        default:
            return state;
    }
}

// 播放器播放状态
function playing(state=false,action){
    switch (action.type) {
        case "SET_PLAYING":
            return action.value;
        default:
            return state;
    }
}

// 播放器当前播放的索引
function currentPlayIndex(state=0,action){
    switch (action.type) {
        case "SET_INDEX":
            return action.value;
        default:
            return state;
    }
}

// 播放器当前的播放类型（顺序 order、随机 random、单曲single）
function playStyle(state="order",action){
    switch (action.type) {
        case "SET_PLAYSTYLE":
            return action.value;
        default:
            return state;
    }
}

// 播放器对象(audio)
function player(state=null,action){
    switch (action.type) {
        case "SET_PLAYER":
            return action.value;
        default:
            return state;
    }
}

// 播放器当前播放的时间
function currentTime(state=0,action){
    switch (action.type) {
        case "SET_CURRENTTIME":
            return action.value;
        default:
            return state;
    }
}

// 当前播放歌曲的歌词
function lyric(state=[],action){
    switch (action.type) {
        case "SET_LYRIC":
            return action.value;
        default:
            return state;
    }
}

export default combineReducers({
    musicList,
    playing,
    currentPlayIndex,
    playStyle,
    player,
    currentTime,
    randomList,
    lyric
});