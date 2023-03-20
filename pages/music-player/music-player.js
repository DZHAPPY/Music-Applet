// pages/music-player/music-player.js
import {getSongDetail,getSongLyric} from "../../services/player"
import {ParseLyric} from "../../utils/parse-lyric"
const App = getApp()
const AudioContent = wx.createInnerAudioContext()
Page({
    data:{
        id:0,
        currentSong:{},
        lyricInfo:"",
        currentPage:0,
        contentHeight:414,
        currentTime:0,
        duration:0,
        progressValue:0,
        isSliderChanging:false,
        isPlaying:true,
        currentLyricText:"",
        currentLyricIndex:-1
    },
    onLoad(option){
        // 设置设备的基本信息
        this.setData({contentHeight:App.globalData.contentHeight})
        this.data.id = option.id

        // 获取歌曲信息和歌词
        this.fetchSongDetail(this.data.id)
        this.fetchSongLyric(this.data.id)

        // 播放当前歌曲
        AudioContent.src = `https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`
        AudioContent.autoplay = true

        // 监听播放进度
        AudioContent.onTimeUpdate(()=>{
            // 判断音乐滑块是否被滑动，若没在滑动才开始监听
            if (!this.data.isSliderChanging) {
                // 设置当前播放时间
                this.setData({currentTime:AudioContent.currentTime * 1000})
                // 设置进度条值
                this.setData({progressValue:100 * (this.data.currentTime/this.data.duration)})
            }
            // console.log(AudioContent.currentTime);
            // 匹配歌词
            if(!this.data.LyricInfos.length) return
            let index = this.data.LyricInfos.length - 1
            for(let i = 0;i<this.data.LyricInfos.length;i++){
                const info = this.data.LyricInfos[i]
                if(info.time > AudioContent.currentTime * 1000){
                    index = i - 1
                    break
                }
            }
            if(this.currentLyricIndex === index) return
            this.setData({
                currentLyricText:this.data.LyricInfos[index].text,
                currentLyricIndex:index
            })
        })
        AudioContent.onWaiting(()=>{
            AudioContent.pause()
        })
        AudioContent.onCanplay(()=>{
            AudioContent.play()
        })

    },
    async fetchSongDetail(id){
        const res = await getSongDetail(id)
        this.setData({
            currentSong:res.songs[0],
            // 设置歌曲时长
            duration:res.songs[0].dt
        })
    },
    async fetchSongLyric(id){
        const res = await getSongLyric(id)
        const lrc = res.lrc.lyric
        const LyricInfos = ParseLyric(lrc)
        this.setData({LyricInfos:LyricInfos})
    },
    onSwiperChange(event){
        // console.log(event);
        this.setData({currentPage:event.detail.current})
    },
    onProgrssChange(event){
        // 获取滑块Value
        const value = event.detail.value
        // 计算播放的时间
        const newTime = this.data.duration * (value/100)
        // 设置播放的时间
        AudioContent.seek(newTime/1000)
        this.setData({currentTime:newTime,isSliderChanging:false})
    },
    onSliderChanging(event){
        // console.log(event.detail.value);
        this.setData({isSliderChanging:true})
    },
    // 控制音乐播放暂停
    onMisicControlTap(){
        if(!AudioContent.paused){
            AudioContent.pause()
            this.setData({isPlaying:false})
        }else{
            AudioContent.play()
            this.setData({isPlaying:true})
        }
    }
})