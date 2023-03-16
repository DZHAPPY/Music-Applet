import {HYEventStore} from "hy-event-store"
import {getPlayListDetail} from "../services/music"

const rankingID = {
    newRanking:"3779629",
    originRanking:"2884035",
    upRanking:"19723756"
}
const rankingStore = new HYEventStore({
    state:{
        newRanking:{},  // 新歌榜
        originRanking:{},   // 原创榜
        upRanking:{}    // 上升榜
    },
    actions:{
        fetchRankingDataActive(ctx){
            for(const key in rankingID){
                const id = rankingID[key]
                getPlayListDetail(id).then(res=>{
                    ctx[key] = res.playlist
                    // console.log(ctx[key]);
                })
            }
        }
    }
})


export default rankingStore