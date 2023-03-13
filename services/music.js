import {MyRequest} from "./index"

export function getMusicBanner(type=2){
    return MyRequest.get({
        url:'/banner',
        data:{
            type
        }
    })
}

export function getPlayListDetail(id){
    return MyRequest.get({
        url:"/playlist/detail",
        data:{
            id
        }
    })
}