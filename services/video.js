import {MyRequest} from "./index"

export function getTopVideo(offset = 0,limit = 20){
    return MyRequest.get({
        url:'/top/mv',
        data:{
            limit,
            offset
        }
    })
}

export function getVideoURL(id){
    return MyRequest.get({
        url:`/mv/url?id=${id}&r=1080`
    })
}

export function getVideoInfo(id){
    return MyRequest.get({
        url:`/mv/detail?mvid=${id}`
    })
}

export function getVideoRelated(id){
    return MyRequest.get({
        url:`/related/allvideo?id=${id}`
    })
}