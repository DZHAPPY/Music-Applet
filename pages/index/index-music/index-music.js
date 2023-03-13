// pages/index/index-music/index-music.js
import {getMusicBanner} from "../../../services/music"
import {throttle} from "underscore"
import {getPlayListDetail} from "../../../services/music"
import recommendStore from "../../../store/RecommendStore"
Page({
    data: {
        searchValue: "",
        bannersUrl: [],
        recommendList: []
    },

    onLoad() {
        this.fetchMusicBanner()
        // this.fetchPlayListDetail()
        recommendStore.onState("recommendSongs",(value)=>{
            this.setData({
                recommendList:value.splice(0,6)
            })
        })

        recommendStore.dispatch("fetchRecommentSongsAction")
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
})