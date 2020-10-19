<template>
  <div class="dashboard-container">
    <div class="showCon">
      <img class="bgImg" src="@/assets/images/workBg.png" alt>
      <div class="txtCon">
        <!-- <div class="nameText">Hello,{{name}}</div> -->
        <div class="timeText">
          您已使用远程办公
          <span>{{ timeUsed }}</span>次
        </div>
        <div class="timeText">
          总使用时长：
          <span>{{ timeUsedHour }}</span>小时
          <span>{{ timeUsedMin }}</span>分钟
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
      <p class="timetxt"> <span>距离使用时间还剩：</span><span style="color:#EB147F">{{ hour }}小时{{ minute }}分{{ seconde }}秒</span></p>
    </div>
    <el-dialog title="请输入远程申请的时间" :visible.sync="selectTimeVisible">
      <el-input-number v-model="num" size="large" step="0.5" :min="0" step-strictly="true" :max="4" label="描述文字" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="applyWork">确 定</el-button>
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
      timeRemaining: '',
      timeUsed: '',
      timeUsedHour: 0,
      timeUsedMin: ''
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
        this.timeUsed = res.timeUsed
        let seNum = res.timeUsedSec

        if (seNum >= 3600) {
          this.timeUsedHour = parseInt(seNum / (60 * 60))
          seNum = seNum % (60 * 60)
          this.timeUsedMin = parseInt(seNum / 60)
          console.log('timeUsedMin', this.timeUsedMin)
        } else {
          this.timeUsedSec = seNum
        }
        this.timeRemaining = res.timeRemaining
        if (this.timeRemaining > 0) {
          this.useProxy = false
          this.hasApply = true
          this.showTime()
        }
      }).catch(error => {
        if (error.response.data.code === 'ERR_UNAUTHORIZED') {
          alert(error.response.data.error)
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        } else {
          console.log('error', error)
        }
      })
    },
    applyWork() {
      applyWork({ hour: this.num }).then(res => {
        if (res.link) {
          this.$message({
            message: '远程申请成功',
            type: 'success'
          })
          this.link = res.link
          this.selectTimeVisible = false
          this.showData()
        }
      }).catch(error => {
        console.log('error2', error)
      })
      this.selectTimeVisible = false
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
  .timetxt span{
    display: inline-block;
    vertical-align: middle;
  }
  .el-dialog__body{
    text-align: center!important;
  }
  .applyedCon{
    background: #F1F8FF;
    border-radius: 8px;
    box-sizing: border-box;
    /* box-shadow: 0 0 8px rgba(0, 0, 0, .1); */
    padding: 18px 0;
    width: 70%;
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
  width: 540px;
  height: 427px;
  position: absolute;
  z-index: 11;
}
.showCon {
  width: 540px;
  height: 427px;
  margin: 16px auto;
  position: relative;
}
.txtCon {
  width: 100%;
  text-align: center;
  line-height: 1.6;
  position: absolute;
  left: 50%;
  top: 28px;
  transform: translateX(-50%);
  letter-spacing: 2px;
  font-size: 28px;
  color: #304156;
}
.nameText {
  font-size: 36px;
  font-weight: 700;
  padding-top: 16px;
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
