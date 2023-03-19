// components/nav-bar/nav-bar.js
const App = getApp()
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{
        statusBarHeight:{
            type:Number,
            value:44
        },
        title:{
            type:String,
            value:"默认标题"
        }
    },
    lifetimes:{
        attached(){
            this.setData({statusBarHeight:App.globalData.statusBarHeight})
        }
    }
})
