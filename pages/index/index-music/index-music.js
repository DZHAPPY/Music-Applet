// pages/index/index-music/index-music.js
import {getMusicBanner} from "../../../services/music"
import {throttle} from "underscore"
import {getPlayListDetail} from "../../../services/music"
Page({
    data: {
        searchValue: "",
        bannersUrl: [],
        recommendList: []
    },

    onLoad() {
        this.fetchMusicBanner()
        this.fetchPlayListDetail()
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

    async fetchPlayListDetail(){
        const res = await getPlayListDetail(3779629)
        const playlist = res.playlist
        this.setData({
          recommendList:playlist.tracks.slice(0,6)
        })
    }
})