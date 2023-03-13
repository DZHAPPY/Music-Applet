// pages/index/index-video/index-video.js
import {
    getTopVideo
} from "../../../services/video"
Page({
    data: {
        videoList: [],
        // limit:20,   // 取出数量 , 默认为 30
        offset: 0, // 偏移数量 , 用于分页
        hasMore: true
    },
    onLoad() {
        // 发送网络请求
        this.fetchTopVideo()
    },

    // 发送获取Video的网络请求的方法
    async fetchTopVideo() {
        // 1.获取数据
        const res = await getTopVideo(this.data.offset)

        // 2.将新的数据添加到原来数据的后面
        const newVideoList = [...this.data.videoList, ...res.data]

        // 3.将新的VideoList设置到数据中
        this.setData({
            videoList: newVideoList
        })
        this.data.offset = this.data.videoList.length
        this.data.hasMore = res.hasMore
    },

    /*上滑底部加载数据 */
    onReachBottom() {
        if(this.data.hasMore){
            this.fetchTopVideo()
        }else{
            wx.showToast({
              title: '无更多数据',
              icon:"none"
            })
            return
        }
    },

    /* 下拉刷新数据 */
    async onPullDownRefresh(){
        // 1.清空数据
        this.setData({videoList:[]})
        this.data.offset = 0
        this.data.hasMore = true

        // 2.重新请求数据
        await this.fetchTopVideo()

        // 3.停止下拉刷新
        wx.stopPullDownRefresh()
    }
})