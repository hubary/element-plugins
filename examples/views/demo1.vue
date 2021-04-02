<!--
* @Author: hubary
* @Email:  hubary@qq.com/han.liu10@pactera.com
* @Description: 描述
-->
<template>
  <div>
    <el-button @click="visible = true">打开el-dialog-limit</el-button>
    <el-dialog-limit :visible.sync="visible">
      <span slot="title">标题</span>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
      </span>
    </el-dialog-limit>
  </div>
</template>

<script>
// import { isArray, isObjectLike } from "lodash";

export default {
  name: 'Hubary',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      visible: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>
