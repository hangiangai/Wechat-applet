// pages/tickets/tickets.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      img_url:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options.img);
      
      var img = options.img;
      this.setData({
        img_url: img
      });

    },

    
})