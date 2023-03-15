// pages/index/index-music/index-music.js\
import {
    getMusicBanner,
    getPlayListDetail,
    getSongMenuList
} 
from "../../../services/music"
import {throttle} from "underscore"
import recommendStore from "../../../store/RecommendStore"

const app = getApp()
Page({
    data: {
        searchValue: "",
        bannersUrl: [],
        recommendList: [],
        hotMenuList:[],
        screenWidth:0
    },

    onLoad() {
        this.fetchMusicBanner()
        this.fetchSongMenuList()
        // this.fetchPlayListDetail()
        recommendStore.onState("recommendSongs",(value)=>{
            this.setData({
                recommendList:value.splice(0,6)
            })
        })

        recommendStore.dispatch("fetchRecommentSongsAction")
        this.setData({screenWidth:app.globalData.screenWidth})
    },
    async fetchMusicBanner() {
        const res = await getMusicBanner()
        this.setData({
            bannersUrl: res.banners
        })
    },
    onRecommandMoreClick() {
        console.log(123);
    },

    // 发起获取推荐歌曲的网络请求(已用其他方式代替)
    // async fetchPlayListDetail(){
    //     const res = await getPlayListDetail(3779629)
    //     const playlist = res.playlist
    //     this.setData({
    //       recommendList:playlist.tracks.slice(0,6)
    //     })
    // }

    // 获取热门歌单
    async fetchSongMenuList(){
        const res = await getSongMenuList()
        this.setData({
            hotMenuList:res.playlists
        })
    }
})