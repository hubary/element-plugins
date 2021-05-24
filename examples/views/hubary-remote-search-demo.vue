<!--
* @Author: hubary
* @Email:  hubary@qq.com
* @描述字段
-->
<template>
  <div>
    <h2>使用远程查询</h2>
    <hubary-remote-search
      v-model="value"
      :remoteApi="remoteApi"
      :initOptions="initOptions"
      :labelKey="(item) => `${item.name}(${item.id})`"
      valueKey="id"
      paramsKey="paramsKey"
      class="form-item-element"
      :setOptions="setOptions"
      @change="change"
    >
    </hubary-remote-search>
  </div>
</template>

<script>
function getData(cnt = 10) {
  return Array(cnt)
    .fill(0)
    .map((v, i) => {
      return {
        id: `value-${i}`,
        name: `label-${i}`,
      };
    });
}
export default {
  name: 'hubary-remote-search-demo',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      value: '',
      initOptions: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    remoteApi() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(getData());
        }, 300);
      });
    },
    setOptions(data) {
      return data.map((v) => ({
        label: v.name,
        value: v.id,
      }));
    },
    change(value) {
      console.log('hubary-remote-search  change', value);
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  margin-bottom: 50px;
}
</style>
