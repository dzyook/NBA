// pages/player/player.js
import {
  API_BASE
} from '../../config/api'
Page({

  /**
   * 页面的初始数据
   */

  data: {
    canshow: true,
    canshow2: true,
    playernum: 5,
    playernum2: 5,
    player1: [],
    player2: [],
    player3: [],
    player4: [],
    player5: []
  },
  showmore: function (e) {
    let canshow = this.data.canshow;
    if (canshow) {
      this.setData({
        canshow: false,
        playernum: 10,
      })
    } else {
      this.setData({
        canshow: true,
        playernum: 5,
      })
    }
  },
  showmore2: function (e) {
    let canshow = this.data.canshow2;
    if (canshow) {
      this.setData({
        canshow2: false,
        playernum2: 10,
      })
    } else {
      this.setData({
        canshow2: true,
        playernum2: 5,
      })
    }
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

  onLoad: function (options) {
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b0cbb4e60480528d24b9b2b/nba/news#!method=get',
      success: (res) => {
        this.setData({
          player1: res.data.data.player1,
          player2: res.data.data.player2
        })
      }
    })

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


})