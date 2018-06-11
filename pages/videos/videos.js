import {
  API_BASE
} from '../../config/api'
 Page({
    inputValue: '',
      data: {
          videos:[
        ],
        currentPage: 1,
        totalPages: 1,
        total: 0,
        hide:false
      },
      onPullDownRefresh() {
        // console.log('下拉了');
        wx.showLoading({
          title: '玩命加载中',
        })
        wx.request({
          url: API_BASE,
          success: (res) => {
            this.setData({
              videos:res.data.data.videos,
              currentPage: 1,
              hide:false
            })
            wx.stopPullDownRefresh()
          }
        })
        wx.hideLoading();
      },
      onLoad: function () {
        wx.showLoading({
          title: '玩命加载中',
        })
        wx.request({
          url: API_BASE,
          success: (res) => {
            this.setData({
              videos:res.data.data.videos,
              currentPage: 1,
              totalPages: res.data.data.totalPages,
              total: res.data.data.total
            })
          }
        }, )
        wx.hideLoading();
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
      onReachBottom() {
        let { currentPage, totalPages } = this.data
        if (currentPage >= totalPages) {
          this.setData({
            hide:true
          })
          return;
        }
        wx.showLoading({
          title: '玩命加载中',
        })
        currentPage += 1;
        wx.request({
          url: API_BASE,
          success: (res) => {
            const videos = [
              ...this.data.videos,
              ...res.data.data.videos,
            ];
            this.setData({
              videos,
              currentPage
            })
            wx.hideLoading();
          }
        })
      },
  })
