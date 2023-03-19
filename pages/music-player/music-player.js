// pages/music-player/music-player.js
import {getSongDetail,getSongLyric} from "../../services/player"
const App = getApp()
Page({
    data:{
        id:0,
        currentSong:{},
        lyric:"",
        currentPage:0,
        contentHeight:414
    },
    onLoad(option){
        // 设置设备的基本信息
        this.setData({contentHeight:App.globalData.contentHeight})
        this.data.id = option.id

        // 获取歌曲信息和歌词
        this.fetchSongDetail(this.data.id)
        this.fetchSongLyric(this.data.id)
    },
    async fetchSongDetail(id){
        const res = await getSongDetail(id)
        this.setData({currentSong:res.songs[0]})
    },
    async fetchSongLyric(id){
        const res = await getSongLyric(id)
        this.setData({lyric:res.lrc.lyric})
    },
    onSwiperChange(event){
        // console.log(event);
        this.setData({currentPage:event.detail.current})
    }
})