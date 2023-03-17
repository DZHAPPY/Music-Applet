// components/menu-ltem/menu-item.js
Component({
    properties:{
        itemData:{
            type:Object,
            value:{}
        }
    },
    methods:{
        onMenuItemTap(){
            const id = this.properties.itemData.id
            wx.navigateTo({
              url: `/pages/detail/detail-songs/detail-songs?type=menu&id=${id}`,
            })
        }
    }
})
