<!--
* @Author: hubary
* @Email:  hubary@qq.com
* @描述字段
-->
<template>
  <div>
    <h2 class="mb-20">hubary-dot</h2>
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="accountName" label="用户名" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="status" label="启用状态" width="180">
        <template #default="{ row }">
          <hubary-dot :key="row.status" :status="row.status" :text="row.status"></hubary-dot>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审批状态" width="180">
        <template #default="{ row }">
          <hubary-dot :key="row.status" :status="row.status">{{ row.status }}</hubary-dot>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <ul>
      <li>
        <hubary-dot status="default" text="待提交" :size="16"></hubary-dot>
      </li>
      <li>
        <hubary-dot status="warning" text="待审批" :size="16"></hubary-dot>
      </li>
      <li>
        <hubary-dot status="processing" text="审批中" :size="16"></hubary-dot>
      </li>
      <li>
        <hubary-dot status="success" text="审批完成" :size="16"></hubary-dot>
      </li>
      <li>
        <hubary-dot status="error" text="驳回" :size="16"></hubary-dot>
      </li>
    </ul>
  </div>
</template>

<script>
const statusList = ['success', 'processing', 'default', 'error', 'warning'];
function getData(cnt = 10) {
  return Array(cnt)
    .fill(0)
    .map((v, i) => {
      const s = i % 5;
      return {
        key: i,
        accountName: `a${i}`,
        name: 10 + i,
        address: `address address ${i}`,
        status: statusList[i],
      };
    });
}
export default {
  name: 'hubary-dot-demo',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      statusList,
      tableData: getData(),
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
li {
  list-style: none;
  font-size: 16px;
  line-height: 32px;
}
</style>
