<template>
    <div class="signUp-page">
        <loginLogo/>
        <div class="signUp">
            <div class="signUp-head">
                <span>用户注册</span>
            </div>
            <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="70px" class="demo-ruleForm">
                <el-form-item prop="phoneOrEmail" label="用户名">
                    <el-input v-model="registerForm.phoneOrEmail" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="birthday" label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birthday" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <!--<el-form-item prop="introduction" label="签名">-->
                    <!--<el-input  type="textarea" placeholder="签名" v-model="registerForm.introduction" ></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item prop="location" label="地区">-->
                    <!--<el-select v-model="registerForm.location" placeholder="地区" style="width:100%">-->
                        <!--<el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <div class="login-btn">
                    <el-button @click="goback(-1)">取消</el-button>
                    <el-button type="primary" @click="SignUp">确定</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
  import loginLogo from '../components/LoginLogo'
  import { mixin } from '../mixins'
  // import { rules, cities } from '../assets/data/form'
  import { SignUp } from '../api/index'

  export default {
    name: 'SignUp-page',
    components: {
      loginLogo
    },
    mixins: [mixin],
    data () {
      return {
        registerForm: { // 注册
          phoneOrEmail: '',
          password: '',
          birthday: ''
        },
        rules: {},
      }
    },

    methods: {
      SignUp () {
        let _this = this;
        let d = this.registerForm.birthday;
        let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

        let userdata = {
          "phoneOrEmail" : this.registerForm.phoneOrEmail,
          "password" : this.registerForm.password,
          "birthday" : datetime
        };
        SignUp(userdata)
          .then(res => {
            if (res.code === 0) {
              this.$message({
                message: "注册成功",
                type: "success"
              });
              setTimeout(function () {
                _this.$router.push({path: '/'});
              }, 1000)
            } else {
              this.notify("注册失败", res.result);
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      goback (index) {
        this.$router.go(index)
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../assets/css/sign-up.scss";
</style>
