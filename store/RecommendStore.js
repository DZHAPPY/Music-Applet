import {HYEventStore} from "hy-event-store"
import {getPlayListDetail} from "../services/music"
const recommendStore = new HYEventStore({
    state:{
        recommendSongs:[]
    },
    actions:{
        fetchRecommentSongsAction(context){
            getPlayListDetail(3779629).then(res=>{
                context.recommendSongs = res.playlist.tracks
            })
        }
    }
})

export default recommendStore