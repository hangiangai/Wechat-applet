// pages/index/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id = options.id;
    let that = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/' + id,
      header: {
        'content-type': 'json' 
      },

      success(res){

        let data = {};
        data.image = res.data.images.large;//封面
        data.title = res.data.title;//标题
        data.year = res.data.year; //上映年份
        data.movie_type = (res.data.genres).join("/");//类型
        data.original_title = res.data.original_title;//原标题
        data.pubdate = res.data.pubdates[1] ? res.data.pubdates[1] : res.data.pubdates[0];//上映时间
        data.durations = res.data.durations[0];
        data.average = res.data.rating.average;//评分
        data.numRaters = res.data.ratings_count;//观看人数
        data.summary = res.data.summary; //简介

        let castsArr = new Array();//演员数组

        let directorsArr = res.data.directors;//导演数组
        console.log(directorsArr);
        for(let index in directorsArr){
          let castsInfo = {};//
          castsInfo.name = directorsArr[index].name;

          if (directorsArr[index].avatars){
            castsInfo.avatars = directorsArr[index].avatars.medium;
          }
          castsInfo.type = "导演";
          castsArr.push(castsInfo);
          console.log("1");
        }

        let tempArr = res.data.casts;//演员数组
        for (let index in tempArr){
          let castsInfo = {};//
          castsInfo.name = tempArr[index].name;
          if (tempArr[index].avatars){
            castsInfo.avatars = tempArr[index].avatars.medium;
          }
          castsInfo.type = "主演";
          castsArr.push(castsInfo);
        }

        data.castsArr = castsArr;


        that.setData({
          data:data
        });

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