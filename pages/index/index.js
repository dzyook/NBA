//index.js
//获取应用实例
import {
  API_BASE
} from '../../config/api'
import util from '../../utils/util';
const app = getApp()

Page({
  data: {
    showLeft: false,
    showRight: false,
    canshow: true,
    move: true,
    hide:false,
    current:1,
    light: 2,
    index: 1,
    num:1,
    agenda: {
    },
    date: [],
    result: [{
      id: 'd22',
      leftteam: "../../images/indextop/4.png",
      leftgrade: 102,
      leftname: '马刺',
      rightteam: "../../images/indextop/5.png",
      rightgrade: 111,
      rightname: '骑士',
    },
    {
      id: 'd23',
      leftteam: "../../images/indextop/10.png",
      leftgrade: 95,
      leftname: '火箭',
      rightteam: "../../images/indextop/9.png",
      rightgrade: 92,
      rightname: '勇士',
    },
    {
      id: 'd24',
      leftteam: "../../images/indextop/5.png",
      leftgrade: 83,
      leftname: '骑士',
      rightteam: "../../images/indextop/4.png",
      rightgrade: 96,
      rightname: '马刺',
    },
    {
      id: 'd25',
      leftteam: "../../images/indextop/9.png",
      leftgrade: 94,
      leftname: '勇士',
      rightteam: "../../images/indextop/10.png",
      rightgrade: 98,
      rightname: '火箭',
    }],
    news: [],
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
          news: res.data.data.new,
          currentPage: 1,
          hide:false
        })
        wx.hideLoading();
        wx.stopPullDownRefresh()
      }
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '玩命加载中',
    })
    util.request({
      url: API_BASE,
      data:{
        date:this.data.date,
        news:this.data.new,
        currentPage:this.data.currentPage,
        totalPages:this.data.totalPages,
      }
      }).then(res => {
        this.setData({
          date: res.data.date,
          news: res.data.new,
          currentPage:res.data.currentPage,
          totalPages: res.data.totalPages,
        })
      })
    this.init();
    wx.hideLoading();
  },
  init: function () {
    let leftgrade = this.data.result[this.data.index].leftgrade;
    let rightgrade = this.data.result[this.data.index].rightgrade;
    let grade = leftgrade > rightgrade ? '1' : '2';
    this.setData({
      agenda: this.data.result[this.data.index],
      index: this.data.index,
      light: grade,
    })
  },
  onReachBottom() {
    let { currentPage, totalPages } = this.data
    if (currentPage >= totalPages) {
      this.setData({
        hide:true,
      })
      return;
    }
    wx.showLoading({
      title: '玩命加载中',
    })
    currentPage += 1;
    util.request({
      url: API_BASE,
      data:{
        news:this.data.new
      }
    }).then(res => {
        const news = [
          ...this.data.news,
          ...res.data.new,
        ];
        this.setData({  
          news,
          currentPage
        })
    }) 
    wx.hideLoading();
  },
  changeleft:function() {
    const index = this.data.index - this.data.num;//获取改变后的那组数据下标
    this.setData({
      agenda: this.data.result[index],// 将球队名 球队分数传入
      light: this.data.result[index].leftgrade > 
      this.data.result[index].rightgrade ? '1' : '2', //比较分数大小 将分数高的color改变
      index: index,
      current:index,
      showLeft: true,
    })
  },
  changeright:function(){
    const index = this.data.index + this.data.num;
    this.setData({
      agenda: this.data.result[index],
      index: index,
      current:index,
      light: this.data.result[index].leftgrade > this.data.result[index].rightgrade ? '1' : '2',
      showRight: true,
    })
  },
  turnleft: function (e) {
    const index = this.data.index -this.data.num;
      if (index <= -1) {
        return;
      } else if (index == 0) {
        this.changeleft();
      } else {
        this.changeleft();
        this.setData({
          showLeft: false,
          showRight: false,
        })
      }
  },
  turnright: function (e) {
    const index = this.data.index + this.data.num;
      if (index >= this.data.date.length) {
        return;
      } else if (index == this.data.date.length-1) {
          this.changeright();
      }
      else {
        this.changeright();
        this.setData({
          showRight: false,
          showLeft: false,
        })
      }
  },
  swiperchange:function(e) {
    const current = e.detail.current;
    const ind = this.data.index;
    const dex = current - ind;
      if(current-ind >0){
        this.setData({
          num:dex
        })
      this.turnright()
      this.setData({
        num:1
      })
    }else if(current - ind <0){
      this.setData({
        num:-dex
      })
     this.turnleft()
     this.setData({
       num:1
     })
    }
   
    console.log(current);
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
})
