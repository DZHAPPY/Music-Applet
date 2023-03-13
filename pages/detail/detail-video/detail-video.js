// pages/detail/detail-video/detail-video.js
import {getVideoURL,getVideoInfo,getVideoRelated} from "../../../services/video"
Page({
    data:{
        id:0,
        VideoURL:'',
        danmuList:[{text:"hahah",color:"#fff000",time:3}],
        MVInfo:{},
        MVRelatedInfo:[]
    },
    
    onLoad(options){
        this.setData({id:options.id})
        this.getMVURL()
        this.getMVInfo()
        this.getMVRelated()
    },

    // 设置请求MVUrl方法
    async getMVURL(){
        const res = await getVideoURL(this.data.id)
        this.setData({VideoURL:res.data.url})
    },

    // 设置请求MVInfo的方法
    async getMVInfo(){
        const res = await getVideoInfo(this.data.id)
        this.setData({MVInfo:res.data})
    },

    //设置请求MV相关视频的方法
    async getMVRelated(){
        const res = await getVideoRelated(this.data.id)
        this.setData({MVRelatedInfo:res.data})
    }
})