<template>
  <el-menu
    :default-active="defaultActive"
    class="aside-menu"
    router
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item v-for="(item, index) in plugins" :key="index" :index="item">
      <span slot="title">{{ item }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: 'hubary-expand-search',
      plugins: ['hubary-expand-search', 'hubary-remote-search', 'el-dialog-limit', 'hubary-dot'],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss" scoped>
.aside-menu {
  height: 100%;
  color: #000;
}
</style>
