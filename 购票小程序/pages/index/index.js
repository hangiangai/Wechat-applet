Page({
    data: {
        id: null,

        showModalStatus: false,

        time_status:false,

        date_status:false,

        latitude: 30.49984,

        longitude: 114.34253,

        //日期数据
        date_list: [
        {
          "index": 0,
          "date": "12.01 星期一",
          "status": false
        },
        {
          "index": 1,
          "date": "12.01 星期二",
          "status": false
        },
        {
          "index": 2,
          "date": "12.01 星期三",
          "status": false
        },
        {
          "index": 3,
          "date": "12.01 星期四",
          "status": false
        },
        {
          "index": 4,
          "date": "12.01 星期五",
          "status": false
        }
      ],
      //时间数据
      time_list: [
        {
          "index": 0,
          "time": "17:00",
          "status": false
        },
        {
          "index": 1,
          "time": "18:00",
          "status": false
        },
        {
          "index": 2,
          "time": "19:00",
          "status": false
        },
        {
          "index": 3,
          "time": "20:00",
          "status": false
        },
        {
          "index": 4,
          "time": "21:00",
          "status": false
        }
      ],

      //景点信息
      attractions_infomation:{
        "opening_hours":"2018.12.01-12.30",
        "name":"武汉.科技馆",
        "content":" 武汉职业技术学院是国家教育部批准独立设置、湖北省人民政府主办、湖北省教育厅直属的全日制普通高等学校，最早办学历史可以追溯到1972年。学校坐拥“武汉·中国光谷”的中心地利，开创了区域化、国际化、现代化高职办学的成功范例，成为引领荆楚、示范全国的高职教育著名品牌"
      },

      //成人数量
      adutls_number:0,
      //儿童数量
      children_number:0,
      //选择的时间
      select_time:"",
      //选择的日期
      select_date:"",
      //总额
      total_amount:0
    },

    get_location(){
      var _this = this;
      const latitude = _this.data.latitude;
      const longitude = _this.data.longitude;

      wx.openLocation({
        latitude:latitude,
        longitude:longitude,
        scale: 18
      })
      
    },


    //日期
    date_change_status: function (e) {
      var index = e.detail.value;
      var listArr = this.data.date_list;
      for (var value in listArr) {
        if (listArr[value].index == index) {
          listArr[value].status = true;
          //保存选择的值
          this.setData({
            select_date: listArr[value].date
          });
        } else {
          listArr[value].status = false;
        }
      }
      this.setData({
        date_list: listArr
      });
    },


    //时间
    time_change_status: function (e) {
      //获取选择的日期的index值
      var index = e.detail.value;
      //用于修改的数组
      var listArr = this.data.time_list;
      //循环数组,改变listArr的值
      for (var value in listArr) {
        if (listArr[value].index == index) {
          listArr[value].status = true;
          //保存选择的值
          this.setData({
            select_time: listArr[value].time
          });
        } else {
          listArr[value].status = false;
        }
      }

      this.setData({
        time_list: listArr
      });
    },


    //修改成人数
    reduce_adutls_number: function () {
      //减
      if (this.data.select_data == "") {
        return false;
      } else if (this.data.select_time =="") {
        return false;
      }else {
        var adutls_number = this.data.adutls_number;
        this.setData({
          adutls_number: adutls_number > 0 ? adutls_number - 1 : 0
        });
        //
        this.change_total_amount();
      }
    },
    add_adutls_number: function () {//增
      if (this.data.select_date == "") {
        return false;
      } else if (this.data.select_time == "") {
        return false;
      } else {
        var adutls_number = this.data.adutls_number;
        this.setData({
          adutls_number: adutls_number < 10000 ? adutls_number + 1 : adutls_number
        });
        this.change_total_amount();
      }
    },

    //修改儿童数
    reduce_children_number: function () {//减
      if (this.data.select_data == "") {
        return false;//没选择日期
      } else if (this.data.select_time == "") {
        return false;//没选择时间
      } else {
        var children_number = this.data.children_number;
        this.setData({
          children_number: children_number > 0 ? children_number - 1 : 0
        });
        this.change_total_amount();
      }
    },
    add_children_number: function () {//增
      if (this.data.select_date == "") {
        return false;
      } else if (this.data.select_time == "") {
        return false;
      } else {
        var children_number = this.data.children_number;
        this.setData({
          children_number: children_number < 10000 ? children_number + 1 : children_number
        });
        this.change_total_amount();
      }
    },


    //修改总额
    change_total_amount:function(){
      var children_num = this.data.children_number;
      var adutls_num = this.data.adutls_number;
      this.setData({
        total_amount:children_num * 50 + adutls_num * 100
      });
    },


    // 点击立即购买弹出弹框
    buy_immediately: function() {
          this.setData({
              showModalStatus: true
          });
      },

    
    
    //确认购买按钮
    buy_confirm:function(){
      //选择日期
      if(this.data.select_date != ""){
        //选择时间
        if(this.data.select_time != ""){
          //参观人数
          if(this.data.adutls_number > 0 || this.data.children_number > 0){

            var _this = this;
            //需要传递的参数
            var data = JSON.stringify({
              "adutls_number": this.data.adutls_number,
              "children_number": this.data.children_number,
              "select_date": this.data.select_date,
              "select_time": this.data.select_time,
              "name":this.data.attractions_infomation.name,
              "total_amount":this.data.total_amount
            })
            var url = '../bound/bound?data='+data;
            //跳转到手机绑定页面
            wx.navigateTo({
              url: url
            })

          }else{
            this.hint("还没选择参观人数了");
          }
        }else{
          this.hint("还没选择时间了");
        }
      }else{
        this.hint("还没选择日期了");
      }
    },

    //提示框
    hint:function(hint){
      wx.showToast({
        title: hint,
        icon:"none",
        duration:2000
      })
    },
    

    // 显示遮罩层
    showModal: function() {
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },


    //隐藏对话框
    hideModal: function() {
    // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 100,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 100)
    }
});