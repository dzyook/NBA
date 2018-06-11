const util = {
  request(opt){
    let options = Object.assign({},opt);
    let {url,data} = options;
    return new Promise((resolve,reject)=> {
      wx.request({
        url,
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res){
          reject(err)
        }
      })
    })
  }
}
export default util
