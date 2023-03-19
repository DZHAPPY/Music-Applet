import {MyRequest} from "./index"

export function getSongDetail(ids){
    return MyRequest.get({
        url:"/song/detail",
        data:{
            ids
        }
    })
}

export function getSongLyric(id){
    return MyRequest.get({
        url:"/lyric",
        data:{
            id
        }
    })
}