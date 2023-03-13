// 封装网络请求的类
class mainRequest{
    constructor(baseURL){
        this.baseURL = baseURL
    }
    request(options){
        const {url} = options
        return new Promise((resolve,reject)=>{
            wx.request({
                ...options,
                url:this.baseURL + url,
                success:(res)=>{
                    resolve(res.data)
                },
                fail:(err)=>{
                    reject(err)
                }
            })
        })
    }
    get(options){
        return this.request({...options,method:"GET"})
    }
    post(options){
        return this.request({...options,method:"POST"})
    }
}

export const videoRequest = new mainRequest("http://codercba.com:9002")