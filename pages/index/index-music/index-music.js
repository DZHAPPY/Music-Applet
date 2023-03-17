// pages/index/index-music/index-music.js\
import {
    getMusicBanner,
    getPlayListDetail,
    getSongMenuList
} 
from "../../../services/music"
import {throttle} from "underscore"
import recommendStore from "../../../store/RecommendStore"
import rankingStore from "../../../store/RankingStore"

const app = getApp()
Page({
    data: {
        searchValue: "",
        bannersUrl: [],
        recommendSongs: [],
        hotMenuList:[],
        recommendList:[],
        screenWidth:0,

        // 巅峰榜数据
        RankingInfos:{}
    },

    onLoad() {
        this.fetchMusicBanner()
        this.fetchSongMenuList()
        // this.fetchPlayListDetail()
        recommendStore.onState("recommendSongInfo",this.handleRecommnedSongs)
        // 监听巅峰榜数据
        rankingStore.onState("newRanking",this.getRankingHandle("newRanking"))
        rankingStore.onState("originRanking",this.getRankingHandle("originRanking"))
        rankingStore.onState("upRanking",this.getRankingHandle("upRanking"))

        recommendStore.dispatch("fetchRecommentSongsAction")
        rankingStore.dispatch("fetchRankingDataActive")
        // 获取屏幕尺寸
        this.setData({screenWidth:app.globalData.screenWidth})
    },
    async fetchMusicBanner() {
        const res = await getMusicBanner()
        this.setData({
            bannersUrl: res.banners
        })
    },
    onRecommandMoreClick() {
        wx.navigateTo({
          url: '/pages/detail/detail-songs/detail-songs?type=recommend',
        })
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
        getSongMenuList().then(res=>{
            this.setData({hotMenuList:res.playlists})
        })

        getSongMenuList("华语").then(res=>{
            this.setData({recommendList:res.playlists})
        })
    },


    // 从Store中获取数据
    handleRecommnedSongs(value){
        const newRecommendSongs = value.tracks
        if(newRecommendSongs){
            this.setData({recommendSongs:newRecommendSongs.splice(0,6)})
        }
        

    },
    getRankingHandle(ranking){
        return value => {
            const newRankingInfo = {...this.data.RankingInfos,[ranking]:value}
            this.setData({RankingInfos:newRankingInfo})
        }
    },

    onUnload(){
        // 页面卸载时取消对 recommendSongs 的监听
        recommendStore.offState("recommendSongs",this.handleRecommnedSongs)
    }
})