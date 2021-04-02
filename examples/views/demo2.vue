<!--
* @Author: hubary
* @Email:  hubary@qq.com/han.liu10@pactera.com
* @Description: 描述
-->
<template>
  <div>
    <hubary-search-expand @search="onSearch" @reset="onReset">
      <el-form :inline="true" :model="formInline" label-width="120px" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人" class="form-item"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域" class="form-item">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域" class="form-item">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域" class="form-item">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域" class="form-item">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域" class="form-item">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域" class="form-item">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </hubary-search-expand>
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
      formInline: {
        user: '',
        region: '',
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch() {
      alert('search');
    },
    onReset() {
      alert('reset');
    },
  },
};
</script>
<style lang="scss" scoped>
.form-item {
  width: 220px;
}
</style>
