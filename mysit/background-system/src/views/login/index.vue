<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">
      <div class="title-container">
        <h3 class="title">个人博客后台管理系统</h3>
      </div>

      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="loginId" v-model="loginForm.loginId" placeholder="请填写账号" name="username" type="text" tabindex="1"
          auto-complete="on" />
      </el-form-item>

      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="loginPwd" v-model="loginForm.loginPwd" :type="passwordType" placeholder="请填写密码"
          name="password" tabindex="2" auto-complete="on" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- 验证码 -->
      <div class="captchaContainer">
        <el-form-item prop="captcha" class="captchaInput">
          <span class="svg-container">
            <svg-icon icon-class="nested" />
          </span>
          <el-input ref="captcha" v-model="loginForm.captcha" placeholder="请填写验证码" name="captcha" type="text" tabindex="3"
            auto-complete="on" @keyup.enter.native="handleLogin" />
        </el-form-item>
        <!-- 验证码图片 -->
        <div class="captchaImg" v-html="svg" @click="getCaptcha">

        </div>
      </div>

      <div class="policy">
        <el-checkbox v-model="loginForm.checked">7 天免费登录</el-checkbox>
      </div>

      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error("请填写用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 || value.length > 15) {
        callback(new Error("密码在6-15之间"));
      } else {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error("验证码为空"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        loginId: "",
        loginPwd: "",
        checked: true,
        captcha: "",
      },
      loginRules: {
        loginId: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        loginPwd: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        captcha: [
          { required: true, trigger: "blur", validator: validateCaptcha },
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,

      svg: ""
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  async created() {
    //清空svg
    this.svg = "";
    this.getData();
  },
  // mounted() {
  //   console.dir(this.$refs.loginForm.$el);
  //   // this.$refs.loginForm.addEventListener("submit", (e) => {
  //   //   e.preventDefault();
  //   //   this.handleLogin();
  //   // });
  // },
  methods: {
    async getData() {
      const resp = await this.$API.captcha.getCaptcha();
      this.svg = resp;
    },
    getCaptcha() {
      //清空svg
      this.svg = "";
      this.getData();

    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    //登录方法
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          //验证通过
          this.loading = true;

          if (this.loginForm.checked) {
            this.loginForm.remember = 7
          }


          this.$store.dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch((resp) => {

              if (resp.msg) {
                //验证码错误
                this.$message.error(resp.msg);
              } else {
                //账号密码不正确
                this.$message.error('账户密码错误，请重新输入');
                this.loginForm.loginPwd = "";
              }

            });
          //需要重新请求验证码
          this.getCaptcha();
          this.loading = false;
          this.loginForm.captcha = "";
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加提交事件
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.captchaContainer {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.captchaInput {
  width: 70%;
}

.captchaImg {
  // border: 1px solid;
  width: 130px;
  height: 53px;
  box-sizing: border-box;
  cursor: pointer;
}

.policy {
  margin-bottom: 15px;
}
</style>
