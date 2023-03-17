// pages/detail/detail-songs/detail-songs.js
import rankingStore from "../../../store/RankingStore"
Page({
    data:{
        type:"",
        key:"",
        songInfos:{}
    },

    onLoad(option){
        // 获取数据的类型   ranking:榜单数据    recommend:推荐数据
        this.data.type = option.type
        this.data.key = option.key


        if(this.data.type === "ranking"){
            rankingStore.onState(this.data.key,this.handleRanking)
        }
        // console.log(type);
    },
    onUnload(){
        if(this.data.type === "ranking"){
            rankingStore.offState(this.data.key,this.handleRanking)
        }
    },
    handleRanking(value){
        console.log(value);
        this.setData({songInfos:value})
        wx.setNavigationBarTitle({
          title: value.name,
        })
    }
})