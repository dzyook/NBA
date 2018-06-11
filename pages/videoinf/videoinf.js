import {
  API_BASE
} from '../../config/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    url:null,
    title:'',
    videos:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      video: {
        id: decodeURIComponent(options.id),
        url: decodeURIComponent(options.url),
        title: decodeURIComponent(options.title),
        num:decodeURIComponent(options.num)
      }
    })
    wx.setNavigationBarTitle({ // 设置当前标题
      title: decodeURIComponent(options.title)
    })
    wx.request({
      url: API_BASE,
      success: (res) => {
        this.setData({
          videos:res.data.data.videos,
        })
      }
    } )
  },
  onShareAppMessage() {
    return {
      path: `/pages/index/index`,
      success: function(res) {
      },
      fail: function(res) {
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})