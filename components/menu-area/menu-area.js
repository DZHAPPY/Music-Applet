// components/menu-area/menu-area.js
const app = getApp()
Component({
    properties:{
        title:{
            type:String,
            value:'默认信息'
        },
        menuList:{
            type:Array,
            value:[]
        }
    },
    data:{
        screenWidth:375
    },
    lifetimes:{
        attached(){
            this.setData({screenWidth:app.globalData.screenWidth})
        }
    },
    methods:{
        menuMoreClick(){
            wx.navigateTo({
              url: '/pages/detail/detail-menu/detail-menu',
            })
        }
    }
})
