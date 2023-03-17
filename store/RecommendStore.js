import {HYEventStore} from "hy-event-store"
import {getPlayListDetail} from "../services/music"
const recommendStore = new HYEventStore({
    state:{
        recommendSongInfo:{}
    },
    actions:{
        fetchRecommentSongsAction(context){
            getPlayListDetail(3779629).then(res=>{
                context.recommendSongInfo = res.playlist
            })
        }
    }
})

export default recommendStore