// pages/index/index-music/index-music.js
import {getMusicBanner} from "../../../services/music"
import {throttle} from "underscore"
Page({
    data:{
        searchValue:"",
        bannersUrl:[]
    },

    onLoad(){
        this.fetchMusicBanner()
    },
    async fetchMusicBanner(){
        const res = await getMusicBanner()
        this.setData({bannersUrl:res.banners})
    }
    ,
    onRecommandMoreClick(){
        console.log(123);
    }
})