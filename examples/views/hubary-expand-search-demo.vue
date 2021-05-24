<!--
* @Author: hubary
* @Email:  hubary@qq.com
* @Description: 描述
-->
<template>
  <div>
    <h2 class="mb-20">hubary-expand-search</h2>
    <p class="mt-10 mb-10">单行放不下，添加展开收起</p>
    <hubary-expand-search @search="onSearch" @reset="onReset">
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
    </hubary-expand-search>
    <el-divider></el-divider>
    <p class="mt-10 mb-10">单行可以放下，则不需要展示展开收起</p>
    <hubary-expand-search @search="onSearch" @reset="onReset">
      <el-form :inline="true" :model="formInline" label-width="120px" class="demo-form-inline">
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
    </hubary-expand-search>
  </div>
</template>

<script>
export default {
  name: 'hubary-expand-search-demo',
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
