import {videoRequest} from "./index"

export function getMusicBanner(type=2){
    return videoRequest.get({
        url:'/banner',
        data:{
            type
        }
    })
}