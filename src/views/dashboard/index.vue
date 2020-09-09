<template>
  <div class="dashboard-container">
    <div class="showCon">
      <img class="bgImg" src="@/assets/images/workBg.png" alt>
      <div class="txtCon">
        <div class="nameText">Hello,{{ userInfo.name }}</div>
        <div class="timeText">
          您已使用远程办公
          <span>243</span>次
        </div>
        <div class="timeText">
          总使用时长：
          <span>36</span>小时
          <span>28</span>分钟
        </div>
      </div>
    </div>
    <div v-show="useProxy" class="openBtn" @click="toUseProxy">
      <el-button type="primary">开启使用代理</el-button>
    </div>
    <div v-show="!useProxy" class="closeBtn" @click="toCloseProxy">
      <el-button type="danger">关闭使用代理</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      userInfo: '',
      useProxy: true
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.showData()
  },
  methods: {
    showData() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    toUseProxy() {
      const token = this.userInfo.token
      const options = {
        url: 'http://sh.asdk.io:8888/jksj/apply_remote_work',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          token: token
        },
        data: {}
      }
      axios(options).then((res) => {
        if (res.status === 200) {
          alert('开始使用')
          this.useProxy = false
        }
        console.log('res', res)
      })
    },
    toCloseProxy() {
      console.log('888')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    text-align: center;
    font-size: 18px;
    line-height: 46px;
  }
}
.openBtn button {
  display: block;
  margin: 32px auto;
}
.bgImg {
  display: block;
  width: 600px;
  height: 475px;
  position: absolute;
  z-index: 11;
}
.showCon {
  width: 600px;
  height: 475px;
  margin: 16px auto;
  position: relative;
}
.txtCon {
  width: 100%;
  text-align: center;
  line-height: 1.5;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: 2px;
}
.nameText {
  font-size: 42px;
  font-weight: 700;
  padding-top: 16px;
}
.txtCon {
  font-size: 28px;
  color: #304156;
}
.timeText span {
  font-size: 52px;
  font-weight: 700;
  color: #eb147f;
}
.openBtn {
  width: 300px;
  color: #fff;
  border-radius: 8px;
  background-color: #419eff;
  text-align: center;
  margin: 48px auto 24px;
  box-shadow: 0 0 16px rgba($color: #419eff, $alpha: 0.7);
}
.openBtn .el-button,
.closeBtn .el-button {
  width: 300px;
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  padding: 0;
}
.closeBtn {
  width: 300px;
  color: #fff;
  border-radius: 8px;
  background-color: #eb147f;
  text-align: center;
  margin: 48px auto 24px;
  box-shadow: 0 0 16px rgba($color: #eb147f, $alpha: 0.7);
}
.el-button--danger {
  background-color: #eb147f;
  border-color: #eb147f;
}
</style>
