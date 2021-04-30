<template>
  <div id="app">
    <el-container class="">
      <el-header>
        <h1>@hubary/element-plugins</h1>
      </el-header>
      <el-container>
        <el-aside width="220px" class="hubary-aside">
          <aside-menu></aside-menu>
        </el-aside>
        <el-main>
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from './aside-menu';
export default {
  name: 'App',
  components: {
    AsideMenu,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
}
body,
html,
#app {
  height: 100%;
  width: 100%;
}
.hubary-aside {
  height: 100%;
  background-color: #f2f2f2;
}
.el-header {
  background: linear-gradient(90deg, #1745fb, #33a2ef);
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.el-container {
  height: 100%;
}
.el-main {
  overflow: hidden;
}
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  // transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  // transform: translateX(30px);
}
</style>
