<template>
  <div id="app">
    <el-container class="">
      <el-header>
        <router-link to="/el-dialog-limit">el-dialog-limit</router-link>
        <router-link to="/hubary-search-expand">hubary-search-expand</router-link>
        <router-link to="/hubary-dot">hubary-dot</router-link>
        <router-link to="/hubary-remote-search">hubary-remote-search</router-link>
      </el-header>
      <el-container>
        <el-aside width="200px" class="hubary-aside">Aside</el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
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
  background: #b0aaaa;
  height: 100%;
}
.el-header {
  background: #c8c8c8;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.el-container {
  height: 100%;
}
</style>
