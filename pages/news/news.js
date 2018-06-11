import {
  API_BASE
} from '../../config/api'
Page({
  data: {
    news: {},
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中',
    })
    this.setData({
      new: {
        id: decodeURIComponent(options.id),
        from: decodeURIComponent(options.from),
        image: decodeURIComponent(options.image),
        title: decodeURIComponent(options.title),
        content: decodeURIComponent(options.content),
      }
    })
    wx.setNavigationBarTitle({ // 设置当前标题
      title: decodeURIComponent(options.title)
    })
    wx.hideLoading();
  },
  next: function (e) {
    var that = this;
    var id = that.data.new.id;
    if (id === 'n8') {
      wx.showModal({
        title: '提示',
        content: '没有更多内容了',
        showCancel: false,
        success: function (res) {
        } })
        return;
    }
    wx.request({
      url: API_BASE,
      success: (res) => {
        for (let i = 0; i < res.data.data.new.length; i++) {
          if (id === res.data.data.new[i].contentId) {
            console.log("找到了");
            this.setData({
              news: res.data.data.new[i + 1],
            })
            var it = this;
            wx.navigateTo({
              url: 'news?id=' + this.data.news.contentId + '&title=' + this.data.news.title + '&from=' + this.data.news.from + '&image=' + this.data.news.image + '&content=' + this.data.news.content + ''
            })
          }
        }
      }
    })
  },
  onShareAppMessage() {
    return {
      path: `/pages/index/index`,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  back: function (e) {
    wx.switchTab({
      url: "../../pages/index/index"
    });
  }
})