<template>
    <div class="login-in">
        <login-logo/>
        <div class="login">
            <div class="login-head">
                <span>帐号登录</span>
            </div>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input placeholder="手机号或邮箱" v-model="loginForm.phoneOrEmail"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="loginForm.password"
                              @keyup.enter.native="handleLoginIn"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <!--<el-button @click="goSignUp()">注册</el-button>-->
                    <el-button type="primary" @click="handleLoginIn">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
  // import { mixin } from '../mixins'
  import LoginLogo from "../components/LoginLogo";
  import { loginIn } from "../api/index";

  //每个文件中只能有一个export default，对外暴露import获取
  export default {
    name: "login-in",
    components: {
      LoginLogo
    },

    //mixins 公用方法或组建供引用
    // mixins: [mixin],

    //data在vue框架中位置不一样，用法也不一样。简单地说，在实例中data是一个对象，在组件中data就得是函数返回对象。
    data: function() {
      let validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("用户名不能为空"));
        } else {
          callback();
        }
      };
      let validatePassword = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      return {
        loginForm: { // 登录用户名密码
          phoneOrEmail: "",
          password: ""
        },
        rules: {
          phoneOrEmail: [
            { validator: validateName, message: "请输入用户名", trigger: "blur" }
          ],
          password: [
            { validator: validatePassword, message: "请输入密码", trigger: "blur" }
          ]
        }
      };
    },

    //created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    //mouted 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作
    // mounted () {
    //   this.changeIndex('登录')
    // },

    //在methods中定义方法，让v-on指令来接收（调用）
    methods: {
      // changeIndex (value) {
      //   this.$store.commit('setActiveName', value)
      // },
      handleLoginIn() {
        let _this = this;
        let params = new URLSearchParams();
        params.append("phoneOrEmail", this.loginForm.phoneOrEmail);
        params.append("password", this.loginForm.password);

        let userdata = {
          "phoneOrEmail" : this.loginForm.phoneOrEmail,
          "password" : this.loginForm.password
        };

        loginIn(userdata)
          .then(res => {
            // console.log('-----------获取登录信息---------------')
            if (res.code === 0) {
              _this.$message({
                message: "登录成功",
                type: "success"
              });
              // _this.setUserMsg(res.result);
              // _this.$store.commit('setLoginIn', true);
              // setTimeout(function () {
              //   _this.changeIndex('首页');
              //   _this.$router.push({path: '/'});
              //   _this.$router.go(0)
              // }, 2000)
            } else {
              this.$notify({
                title: "提示",
                message: "用户名或密码错误",
                position: "top-right",
                duration: 2
              })
            }
          })
          .catch(failResponse => {
          });
      }

      //
      // setUserMsg (item) {
      //   //vuex Vue 的状态管理工具 可以作为公共数据缓存使用
      //   this.$store.commit('setUserId', item.id);
      //   this.$store.commit('setUsername', item.phoneOrEmail);
      //   this.$store.commit('setAvator', item.avator)
      // },

      //借助router.push跳转页面
      // goSignUp () {
      //   this.$router.push({path: '/sign-up'})
      // }
    }
  };
</script>

<style lang="scss" scoped>
    @import '../assets/css/login-in.scss';
</style>
