// components/music-list/music-list.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemData:{
            type:Object,
            value:{}
        }
    },
    methods: {
        onSongItemTap(){
            const id = this.properties.itemData.id
            wx.navigateTo({
              url: `/pages/music-player/music-player?id=${id}`,
            })
        }
    }
})
