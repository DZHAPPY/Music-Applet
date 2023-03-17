// components/ranking-item/ranking-item.js
Component({
    properties:{
        itemData:{
            type:Object,
            value:{}
        },
        key:{
            type:String,
            value:""
        }
    },
    methods:{
        onRankingItemTap(){
            const key = this.properties.key
            console.log(key);
            wx.navigateTo({
              url: `/pages/detail/detail-songs/detail-songs?type=ranking&key=${key}`,
            })
        }
    }
})
