<template>
  <el-container class="home-container">
    <el-aside :width="isOpen ? '200px' : '64px'" class="mennu-aside">
      <div class="logo" :class="{ smallLogo: !isOpen }"></div>
      <el-menu
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right: none"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="menu-header">
        <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="down" @command="handlClick">
          <span class="el-dropdown-link">
            <img class="headIcon" :src="photo" alt="" />
            <span class="userName">{{ name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting"
              >个人设置</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-unlock" command="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isOpen: true,
      photo: '',
      name: ''
    }
  },
  methods: {
    toggleMenu () {
      this.isOpen = !this.isOpen
    },
    logout () {
      window.sessionStorage.removeItem('hm')
      this.$router.push('/login')
    },
    setting () {
      this.$router.push('/setting')
    },
    handlClick (command) {
      this[command]()
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('hm')) || ''
    this.photo = user.photo
    this.name = user.name
  }
}
</script>

<style>
.home-container {
  widows: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
}
.mennu-aside {
  background: #002033;
}
.menu-header {
  border-bottom: 1px solid #ddd;
  line-height: 60px;
}
.icon {
  font-size: 30px;
  vertical-align: middle;
}
.text {
  margin-left: 10px;
  vertical-align: middle;
}
.down {
  float: right;
}
.headIcon {
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border-radius: 50%;
}
.userName {
  margin-left: 5px;
  font-weight: bold;
  vertical-align: middle;
}
.logo {
  width: 100%;
  height: 60px;
  background: #002244 url('../../assets/logo_admin.png') no-repeat center /
    140px auto;
}
.smallLogo {
  background-image: url('../../assets/logo_admin_01.png');
  background-size: 36px auto;
}
</style>
