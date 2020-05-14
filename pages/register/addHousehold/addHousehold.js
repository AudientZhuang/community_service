// pages/register/addHousehold/addHousehold.js
var util = require('../../../utils/util.js')
var common = require('../../../service/common.js')
import {
  addHousehold,
  Household
} from '../../../service/info.js'
Page({
  data: {
    //bindblur监听并显示
    isDisplay1: "none",
    isDisplay2: "none",
    isDisplay3: "none",
    isDisplay4: "none",
    warnMsg: "Warn Msg",
    isError: false,
    genderIndex: 0,
    gender: ['男', '女'],
    date: '2017-09-01',
    buildingId: 1,
    roomId: 1
  },
  //检验姓名
  testName(e) {
    const name = e.detail.value
    //验证姓名无误 打勾
    if (util.checkName(name)) {
      this.setData({
        isDisplay1: ""
      })
    } else {
      //有误 报错
      this.setData({
        warnMsg: "输入姓名格式不正确",
        isError: true,
        isDisplay1: "none"
      })
    }
  },
  //检验身份证
  testIDcard(e) {
    const IDcard = e.detail.value
    //验证身份证无误 打勾
    if (util.checkIDcard(IDcard)) {
      this.setData({
        isDisplay2: ""
      })
    } else {
      //有误 报错
      this.setData({
        warnMsg: "输入身份证格式不正确",
        isError: true,
        isDisplay2: "none"
      })
    }
  },
  //检验年龄
  testAge(e) {
    const age = e.detail.value
    //验证身份证无误 打勾
    if (util.checkAge(age)) {
      this.setData({
        isDisplay3: ""
      })
    } else {
      //有误 报错
      this.setData({
        warnMsg: "输入年龄不正确",
        isError: true,
        isDisplay3: "none"
      })
    }
  },
  //检验电话
  testTel(e) {
    const phone = e.detail.value
    if (!util.checkPhone(phone)) {
      //有误 报错
      this.setData({
        warnMsg: "联系电话格式不正确",
        isError: true,
        isDisplay4: "none"
      })
    } else {
      //验证联系电话无误 打勾
      this.setData({
        isDisplay4: ""
      })
    }
  },
  //监听日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //监听性别
  bindGenderChange: function (e) {
    console.log('picker发送选择改变，携带值为', e, e.detail.value)
    this.setData({
      genderIndex: e.detail.value
    })
  },
  addHousehold(e) {
    if (this.data.isDisplay1 == ""
      && this.data.isDisplay2 == ""
      && this.data.isDisplay3 == ""
      && this.data.isDisplay4 == "") {
      const data = e.detail.value
      const household = new Household(data)
      household.gender = this.data.gender[this.data.genderIndex]
      household.buildingId = this.data.buildingId
      household.roomId = this.data.roomId
      console.log(household)

      //提交表单并跳转登录页
      addHousehold(household).then(res => {
        const result = res.data
        if (result.status == 1) {
          wx.showToast({
            title: '注册成功',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: 'pages/login/login'
                })
              }, 2000)
            }
          })
        } else {
          common.system.busy()
        }
      })
    } else {
      wx.showModal({
        title: '出错啦',
        content: '请确认输入信息是否正确',
        showCancel: false
      })
    }
  },
  onLoad: function (options) {
    //获取buildingId，roomId
    console.log("获取到的楼栋id：" + options.buildingId)
    console.log("获取到的房间id：" + options.roomId)
  }
})