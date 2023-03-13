import {videoRequest} from "./index"

export function getTopVideo(offset = 0,limit = 20){
    return videoRequest.get({
        url:'/top/mv',
        data:{
            limit,
            offset
        }
    })
}

export function getVideoURL(id){
    return videoRequest.get({
        url:`/mv/url?id=${id}&r=1080`
    })
}

export function getVideoInfo(id){
    return videoRequest.get({
        url:`/mv/detail?mvid=${id}`
    })
}

export function getVideoRelated(id){
    return videoRequest.get({
        url:`/related/allvideo?id=${id}`
    })
}