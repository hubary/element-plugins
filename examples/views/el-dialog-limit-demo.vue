<!--
* @Author: hubary
* @Email:  hubary@qq.com
* @Description: 描述
-->
<template>
  <div>
    <h2>el-dialog-limit</h2>
    <el-button v-for="size in sizeType" :key="size" type="primary" @click="change(size)">{{
      size
    }}</el-button>
    <el-dialog-limit :visible.sync="visible" :size="current">
      <span slot="title">标题{{ current }}</span>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
      </span>
    </el-dialog-limit>
  </div>
</template>

<script>
export default {
  name: 'Hubary',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      visible: false,
      sizeType: ['mini', 'small', 'medium', 'fullscreen'],
      current: 'small',
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    change(current) {
      this.current = current;
      this.visible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  margin-bottom: 50px;
}
</style>
