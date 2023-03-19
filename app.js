// app.js
App({
    globalData:{
        screenWidth: 0,
        screenHight: 0,
        statusBarHeight:44,
        contentHeight:414
    },
    onLaunch(){

        // 获取设备信息，拿到屏幕宽高
        wx.getSystemInfo({
            success:res=>{
                this.globalData.screenWidth = res.screenWidth
                this.globalData.screenHight = res.screenHight
                this.globalData.statusBarHeight = res.statusBarHeight
                this.globalData.contentHeight = res.screenHeight - res.statusBarHeight - 44
                console.log(this.globalData.contentHeight);
            }
        })
    }
})
