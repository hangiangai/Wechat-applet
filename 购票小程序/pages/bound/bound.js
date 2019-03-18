Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '13545669076',//手机号
        code: '123456',//验证码
        iscode: "123456",//用于存放验证码接口里获取到的code
        codename: '获取验证码',
        ticket_info:''
    },

    //得到输入手机号
    getPhoneValue: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },


    //得到输入的验证码
    getCodeValue: function (e) {
        this.setData({
            code: e.detail.value
        })
    },


    //调用接口获取验证码
    getCode: function () {
        var a = this.data.phone;
        var _this = this;
        var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
        if (this.data.phone == "") {
            _this.hint('手机号不能为空');
            return false;
        } else if (!myreg.test(this.data.phone)) {
            _this.hint('请输入正确的手机号');
            return false;
        } else {
            wx.request({
                'url': '',//接口地址
                data: {},//传入接口的值
                success(res) {
                    console.log(res.data.data)
                    _this.setData({
                        iscode: res.data.data
                    })
                    var num = 61;
                    var timer = setInterval(function () {
                        num--;
                        if (num <= 0) {
                            clearInterval(timer);
                            _this.setData({
                                codename: '重新发送',
                                disabled: false
                            })

                        } else {
                            _this.setData({
                                codename: num + "s"
                            })
                        }
                    }, 1000)
                }
            })

        }
    },

    //
    getVerificationCode() {
        //调用getCode方法
        this.getCode();
        var _this = this
        _this.setData({
            disabled: true
        })
    },

    //下一步
    verificationcode:function(){
        var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
        if (this.data.phone == "") {
            this.hint('手机号不能为空');
            return false;
        } else if (!myreg.test(this.data.phone)) {
            this.hint('请输入正确的手机号');
            return false;
        }
        if (this.data.code == "") {
            this.hint('验证码不能为空');
            return false;
        } else if (this.data.code != this.data.iscode) {
            this.hint('验证码错误');
            return false;
        } else {
            //将信息保存在本地
            wx.setStorageSync('phone', this.data.phone);
            //跳转到信息确认框
          var url = '../affirm/affirm?data=' + this.data.ticket_info;
            wx.navigateTo({
                url: url,
            })
        }
    },

    //提示
    hint:function(hint){
      wx.showToast({
        title: hint,
        icon:"none",
        duration:1000
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      //接受index页面传入的值
      this.setData({
        ticket_info: options.data
      });
    },

})