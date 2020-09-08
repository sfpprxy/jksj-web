<template>
  <div class="dashboard-container">
    <div class="dashboard-text"> {{ userInfo.name }}您好！</div>
    <div class="dashboard-text"> 您已使用远程办公243次。</div>
    <div class="dashboard-text"> 总时间36小时28分钟。</div>
    <div class="openBtn">
      <el-button type="primary" @click="toUseProxy">开启使用代理</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from "axios";

export default {
  name: 'Dashboard',
  data(){
    return{
      userInfo:''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.showData();
  },
  methods:{
    showData(){
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    },
    toUseProxy(){
      let token = this.userInfo.token
      const options = {
        url: "http://sh.asdk.io:8888/jksj/apply_remote_work",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          token:token,
        },
        data: {
        },
      };
      axios(options).then((res) => {
        console.log('res',res);
      });
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
.openBtn button{
  display: block;
  margin: 32px auto;
}
</style>
