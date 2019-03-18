Page({

  /**
   * 页面的初始数据
   */
  data: {
    txtOrderCode: '',
    //订票协议是否勾选
    booking_agreement_status: false,
    //取票方式状态
    change_way_status: false,
    //取票按钮点击次数
    click_number: 0,
    //取票人姓名
    collect_ticket_person_name: "",
    //取票人联系方式
    collect_ticket_person_contact: "",
    //门票信息
    ticket_info: {},
    //地点
    site: "武汉江汉光",
  },

  //改变取票信息
  change_way: function() {
    if (this.data.click_number == 0) {
      this.setData({
        click_number: 1,
        change_way_status: true,
      });
    } else {
      this.setData({
        click_number: 0,
        change_way_status: false,
      });
    }
  },


  //获取真实姓名
  get_real_name: function(events) {
    this.data.collect_ticket_person_name = events.detail.value;
  },


  //获取联系人方式
  get_contact: function(events) {
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (myreg.test(events.detail.value)) {
      this.data.collect_ticket_person_contact = events.detail.value;
    }
  },

  //是否勾选订票协议
  change_booking_agreement: function() {
    if (!this.data.booking_agreement_status) {
      this.setData({
        booking_agreement_status: true
      });
      console.log(this.data.booking_agreement_status);
    } else {
      this.setData({
        booking_agreement_status: false
      });
      console.log(this.data.booking_agreement_status);
    }
  },


  //提示
  hint: function(hint) {
    wx.showToast({
      title: hint,
      icon: 'none',
      duration: 1000
    })
  },


  //调取支付
  chooseSezi: function() {

    if (this.data.change_way_status) {
      if (this.data.collect_ticket_person_name != "") {
        if (this.data.collect_ticket_person_contact != "") {
          if (this.data.booking_agreement_status) {
            var name = this.data.collect_ticket_person_name; //  
            var contact = this.data.collect_ticket_person_contact;
            var final_info = this.data.ticket_info; //上传到服务器的信息
            final_info.collect_name = name; //添加取票人姓名
            final_info.collect_contact = contact; //添加取票人联系方式
            var final_info_toString = JSON.stringify(final_info); //将json转化为对象
            wx.request({
              url: 'https://zl0gue6t.qcloud.la/index.php/CreateQrcode/create_qrcode/' + final_info_toString,
              //成功获得二维码地址
              success(res) {
                //跳转到tickets页面
                wx.navigateTo({
                  url: '../tickets/tickets?img=' + res.data,
                })
              },
              //请求失败
              fail() {
                console.log("No");
              }
            })
          } else {
            this.hint("请勾选订票协议");
          }
        } else {
          this.hint("还没填写联系方式了");
        }
      } else {
        this.hint("还没填写真实姓名了");
      }
    } else {
      this.hint("还没选着取票方式了");
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.data) {
      var to_json = JSON.parse(options.data);
      console.log(to_json);
      this.setData({
        ticket_info: to_json
      });
    }
  },

})