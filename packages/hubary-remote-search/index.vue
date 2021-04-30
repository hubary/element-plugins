<!--
* @Author: hubary
* @Email:  hubary@qq.com
* @Description: 描述
* @描述字段
-->
<template>
  <el-select
    v-model="innerValue"
    filterable
    remote
    :size="size"
    clearable
    :no-data-text="noDataText"
    reserve-keyword
    :remote-method="remoteMethod"
    :multiple="multiple"
    :loading="loading"
    :loading-text="loadingText"
    :placeholder="placeholder"
    @change="onChange"
    @remove-tag="onRemoveTag"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { debounce } from '../utils/index';
import { isInclude, isString, isFunction } from '../utils/types';
export default {
  name: 'HubaryRemoteSearch',
  components: {},
  mixins: [],
  model: {
    event: 'input',
    prop: 'value',
  },
  props: {
    // v-model的值
    value: {
      type: [String, Array],
      default: null,
    },
    size: {
      type: String,
      default: 'mini',
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // options的lableKey
    labelKey: {
      type: [String, Function],
      default: 'label',
    },
    // options的 valueKey
    valueKey: {
      type: String,
      default: 'value',
    },
    // 接口发送数据携带的key
    paramsKey: {
      type: String,
      default: 'id',
    },
    // 必要参数,传入api接口即可
    remoteApi: {
      type: Function,
      required: true,
      validator: function(value) {
        // console.log("validator isFunction(value)", isFunction(value));
        return isFunction(value);
      },
    },
    placeholder: {
      type: String,
      default: '请输入关键词进行搜索',
    },
    initSearchVal: {
      type: String,
      default: undefined,
    },
    initOptions: {
      type: Array,
      default: () => [],
    },
    setOptions: {
      type: Function,
      required: false,
      validator: function(value) {
        // console.log("validator isFunction(value)", isFunction(value));
        return isFunction(value);
      },
    },
    loadingText: {
      type: String,
      default: '查询中...',
    },
    searchLimit: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      options: [],
      loading: false,
      collector: [],
      noDataText: '无数据',
    };
  },
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
        if (val) {
          this.filterSelected(val);
        } else {
          this.options = [];
        }
      },
    },
  },
  watch: {
    multiple(newVal) {
      this.options = [];
      this.innerValue = newVal ? [] : null;
    },
    initSearchVal(newVal) {
      // TODO newVal
    },
    initOptions: {
      handler(newVal, oldVal) {
        if (Array.isArray(newVal)) {
          this.options = newVal;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    filterSelected(selectedVal) {
      const { options, multiple } = this;
      const selected = options.filter((v) => {
        if (multiple && Array.isArray(selectedVal)) {
          return selectedVal.includes(v);
        } else {
          return v.value === selectedVal;
        }
      });
      this.$emit('change', selectedVal, selected);
    },
    // 远程搜索
    remoteMethod: debounce(function(searchVal) {
      console.log('remoteMethod', searchVal);
      if (isString(searchVal) && searchVal.trim()) {
        if (searchVal.length < this.searchLimit) {
          this.noDataText = `请至少输入${this.searchLimit}位长度`;
          return;
        }
        const { labelKey, valueKey, paramsKey } = this;
        const params = {
          [paramsKey]: searchVal.trim(),
        };
        this.loading = true;
        this.remoteApi(params)
          .then((res) => {
            let options = [];
            if (isFunction(this.setOptions)) {
              options = this.setOptions(res);
            } else if (isInclude(res, 'data') && Array.isArray(res.data)) {
              res.data.forEach((v) => {
                if (isString(labelKey)) {
                  v.label = v[labelKey];
                } else if (isFunction(labelKey)) {
                  v.label = labelKey(v);
                }
                v.value = String(v[valueKey]);
              });
              options = res.data;
            }
            this.options = options;
          })
          .catch(() => {
            this.options = [];
          })
          .finally(() => {
            this.noDataText = '无数据';
            this.loading = false;
          });
      } else {
        this.noDataText = '无数据';
        this.options = [];
      }
    }, 300),
    onChange(val) {
      console.log('onChange', val);
    },
    onRemoveTag(removeVal) {
      console.log('onRemoveTag', removeVal);
    },
  },
};
</script>
<style lang="scss" scoped></style>
