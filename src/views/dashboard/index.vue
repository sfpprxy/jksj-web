<template>
  <div class="dashboard-container">
    <div class="showCon">
      <img class="bgImg" src="@/assets/images/workBg.png" alt>
      <div class="txtCon">
        <!-- <div class="nameText">Hello,{{name}}</div> -->
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
    <!-- @click="applyWork" -->
    <div v-show="useProxy" class="openBtn" @click="selectTimeVisible = true">
      <el-button type="primary">申请使用远程办公</el-button>
    </div>
    <div v-show="hasApply" class="applyedCon">
      <p>
        <span>您已申请远程办公：</span>
        <el-link target="_blank" :href="link" type="success">{{ link }}</el-link>
      </p>
      <p> 距离使用时间还剩：<span style="color:#EB147F">{{ hour }}小时{{ minute }}分{{ seconde }}秒</span></p>
    </div>
    <el-dialog title="请输入远程申请的时间" :visible.sync="selectTimeVisible">
      <el-input-number v-model="num" size="large" :min="0" :max="4" label="描述文字" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="applyWork">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="申请成功" :visible.sync="linkVisible">
      <span>您的远程链接为：{{ link }}</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { applyWork, applyStatus } from '@/api/proxy'

export default {
  name: 'Dashboard',
  data() {
    return {
      selectTimeVisible: false,
      linkVisible: false,
      useProxy: true,
      hasApply: false,
      num: 1,
      link: '',
      seconde: '',
      minute: '',
      hour: '',
      name: '',
      timeRemaining: ''
    }
  },
  computed: {
  },
  mounted() {
    this.showData()
  },
  methods: {
    showData() {
      applyStatus().then(res => {
        console.log('resres', res)
        this.link = res.link
        this.timeRemaining = res.timeRemaining
        if (this.timeRemaining > 0) {
          this.useProxy = false
          this.hasApply = true
          this.showTime()
        }
      }).catch(error => {
        console.log('error1', error)
      })
    },
    applyWork() {
      applyWork({ time: this.num }).then(res => {
        if (res.link) {
          this.link = res.link
          this.selectTimeVisible = false
          this.linkVisible = true
        }
      }).catch(error => {
        console.log('error2', error)
      })
      this.selectTimeVisible = false
    },
    applyOk() {
      this.linkVisible = false
      this.showData()
    },
    showTime() {
      const that = this
      let num = that.timeRemaining
      if (num > 0) {
        that.hour = parseInt(num / (60 * 60))
        num = num % (60 * 60)
        that.minute = parseInt(num / (60))
        num = num % (60)
        that.seconde = parseInt(num)

        setTimeout(function() {
          that.showTime()
          that.timeRemaining = that.timeRemaining - 1
        }, 1000)
      } else {
        this.useProxy = true
        this.hasApply = false
      }
    }
  }
}
</script>
<style>
  .el-dialog__body{
    text-align: center!important;
  }
  .applyedCon{
    background: #F1F8FF;
    border-radius: 8px;
    /* box-shadow: 0 0 8px rgba(0, 0, 0, .1); */
    padding: 18px 0;
    width: 60%;
    margin: 0 auto;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    color: #304156;
  }
  .applyedCon p span{
    display: inline-block;
    vertical-align: middle;
  }
  .el-link--inner{
    font-size: 32px;
  }
</style>
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
  font-size: 36px;
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
