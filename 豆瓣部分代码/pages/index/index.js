//index.js
//获取应用实例
const query = wx.createSelectorQuery();
const app = getApp()

Page({
  data: {
    navBar: ["正在热映", "即将上映","个人中心"],
    currentBar: 0,
    videoInfo: [],
    viodeComing:[]
  },


  //获取navBar点击id
  navBarChange: function(e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({
      currentBar: e.currentTarget.dataset.id
    })
  },


  //页面初始化加载
  onLoad: function() {

    let that = this;
    let url = 'https://douban.uieee.com/v2/movie/in_theaters?count= 20'; 
    this.loadData(url,function(data){
      that.setData({
        videoInfo:data
      });
    });

    let url_1 = "https://douban.uieee.com/v2/movie/coming_soon?start=0&count=20";
    this.loadData(url_1,function(data){
      that.setData({
        viodeComing:data
      });
    });

    
  },

  //下拉刷新
  onPullDownRefresh: function() {
    let that = this;
    wx.startPullDownRefresh({
      success(){
        that.onLoad();

        //停止下来刷新
        setTimeout(() => {
          wx.stopPullDownRefresh();
        }, 2000);

      }
    });
  },


  //加载数据
  loadData: function(url,callback) {
    wx.request({
      url: url,
      header: {
        'content-type': 'json' // 默认值
      },
      method:"POST",
      success(res) {
        let resultArr = new Array();
        for (let i = 0; i < res.data.subjects.length; i++) {//遍历数组

          let videoInfo = {};
          let castsInfo = res.data.subjects[i].casts;
          let castsArr = new Array();
          for (let index in castsInfo) {
            castsArr.push(castsInfo[index].name);
          }
          videoInfo.casts = castsArr.join("/"); //导演

          videoInfo.id = res.data.subjects[i].id;//视频id号
          videoInfo.cover = res.data.subjects[i].images.medium; //封面
          videoInfo.title = res.data.subjects[i].title; //标题

          let collect_count = parseFloat(res.data.subjects[i].collect_count);
          videoInfo.collect_count = collect_count > 10000?((collect_count/10000).toFixed(1)+"万"):(collect_count+"人");

          let directorsInfo = res.data.subjects[i].directors;
          let directorsArr = new Array();
          for (let index in directorsInfo) {
            directorsArr.push(directorsInfo[index].name);
          }
          videoInfo.directors = directorsArr.join("/");//主演



          resultArr.push(videoInfo);//添加到数组
        }
        callback(resultArr);//回调函数
      }
    });
  }



})