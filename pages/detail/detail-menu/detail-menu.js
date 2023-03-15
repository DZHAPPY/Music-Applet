// pages/detail/detail-menu/detail-menu.js
import {getSongMenuTag,getSongMenuList} from "../../../services/music"
Page({
    data:{
        songMenus:[]
    },
    onLoad(){
        this.fetchGetAllMenuList()
    },
    async fetchGetAllMenuList(){
        // 1.获取tags
        const res = await getSongMenuTag()
        const tags = res.tags
        
        // 2.根据tag获取歌曲列表
        const allPromise = []
        for(const tag of tags){
            const promise = getSongMenuList(tag.name)
            allPromise.push(promise)
        }

        // 3.获取数据后传入到songMenus
        Promise.all(allPromise).then(res=>{
            this.setData({songMenus:res})
        })
    }
})