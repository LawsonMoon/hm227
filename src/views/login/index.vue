<template>
  <div class="container">
    <el-card>
      <img class="index-img" src="../../assets/logo_index.png" alt="" />
      <el-form
        ref="dataForm"
        :model="LoginForm"
        :rules="LoginRules"
        status-icon
      >
        <el-form-item prop="mobile">
          <el-input
            placeholder="请输入手机号"
            v-model="LoginForm.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            placeholder="请输入验证码"
            v-model="LoginForm.code"
            style="width: 240px; margin-right: 8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      LoginForm: {
        mobile: '',
        code: ''
      },
      LoginRules: {
        mobile: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { len: 6, message: '验证码是六位', trigger: 'blur' },
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$http.post('authorizations', this.LoginForm).then(res => {
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('手机号或验证码错误')
          })
        }
      })
    }
  }
}
</script>

<style>
.container {
  widows: 100%;
  height: 100%;
  background: url('../../assets/login_bg.jpg') no-repeat center / cover;
  position: absolute;
  left: 0;
  right: 0;
}
.el-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.index-img {
  width: 200px;
  display: block;
  margin: 0 auto;
  margin-bottom: 30px;
}
</style>
