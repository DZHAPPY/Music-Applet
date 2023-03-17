// pages/detail/detail-songs/detail-songs.js
import rankingStore from "../../../store/RankingStore"
import recommendStore from "../../../store/RecommendStore"
import {getPlayListDetail} from "../../../services/music"
Page({
    data:{
        type:"",
        key:"",
        songInfos:{},
        id:0
    },

    onLoad(option){
        // 获取数据的类型   ranking:榜单数据    recommend:推荐数据
        this.setData({type:option.type})
        this.data.key = option.key


        if(this.data.type === "ranking"){
            rankingStore.onState(this.data.key,this.handleRanking)
        }else if(this.data.type === "recommend"){
            recommendStore.onState("recommendSongInfo",this.handleRanking)
        }else if(this.data.type === "menu"){
            this.data.id = option.id
            this.fetchMenuSongInfo()
        }
 
    },
    onUnload(){
        if(this.data.type === "ranking"){
            rankingStore.offState(this.data.key,this.handleRanking)
        }
    },
    handleRanking(value){
        // console.log(value);
        if(this.data.type === "recommend"){
            value.name = '推荐歌曲'
        }
        this.setData({songInfos:value})
        wx.setNavigationBarTitle({
          title: value.name,
        })
    },
    async fetchMenuSongInfo(){
        const res = await getPlayListDetail(this.data.id)
        this.setData({songInfos:res.playlist})
    }
})