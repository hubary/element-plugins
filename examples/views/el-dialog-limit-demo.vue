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
    <el-dialog-limit
      :visible.sync="visible"
      :size="current"
      :loading="loading"
      :loadingOptions="loadingOptions"
    >
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
  name: 'el-dialog-limit-demo',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      visible: false,
      sizeType: ['mini', 'small', 'medium', 'fullscreen'],
      current: 'small',
      loading: false,
      loadingOptions: {
        text: '加载中',
      },
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
      setTimeout(() => {
        this.loading = true;
      }, 2000);
      this.loadingOptions.text = '文件正在上传中,请稍后...';
      setTimeout(() => {
        this.loadingOptions.text = '服务部署中,请稍后...';
      }, 4000);
      setTimeout(() => {
        this.loading = false;
      }, 6000);
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  margin-bottom: 50px;
}
</style>
