<!--
* @Author: hubary
* @Email:  hubary@qq.com
* @描述
-->
<template>
  <div
    class="hubary-search-frame"
    :style="{
      height: expand ? 'auto' : oneItemHeight + 'px',
      overflow: 'hidden',
    }"
  >
    <div ref="searchRef" class="hubary-search-form">
      <slot name="default"></slot>
    </div>
    <div class="hubary-search-button">
      <span class="collapse-icon">
        <a v-show="showExpandIcon" @click="toggle"
          >{{ expand ? '收起' : '展开' }}
          <i :class="expand ? 'el-icon-arrow-right' : 'el-icon-arrow-down'" />
        </a>
      </span>
      <template v-if="$slots.buttons && buttons.length == 2">
        <slot name="buttons"></slot>
      </template>
      <template v-else>
        <el-button size="mini" icon="el-icon-search" type="primary" @click="onSearch"
          >搜索</el-button
        >
        <el-button size="mini" icon="el-icon-refresh-left" @click="onReset">重置</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import { debounce } from '../utils/index';
export default {
  name: 'HubaryExpandSearch',
  components: {},
  props: {
    oneItemHeight: {
      type: Number,
      default: 51,
    },
    buttons: {
      type: Array,
      default: () => {
        return [{ text: '查询', size: 'mini' }];
      },
    },
  },
  data() {
    return {
      expand: false,
      formHeight: 0,
      showControl: false,
    };
  },
  computed: {
    showExpandIcon() {
      if (this.formHeight) {
        return this.formHeight > this.oneItemHeight;
      }
      return this.showControl;
    },
  },
  mounted() {
    console.log('mounted');
    this.$nextTick(() => {
      const resizeObserver = new ResizeObserver(
        debounce((entries) => {
          for (const entry of entries) {
            // console.log("ResizeObserver entry", entry);
            this.$nextTick(() => {
              this.formHeight = entry.contentRect.height;
            });
          }
        }, 100)
      );
      // console.log('%c initOnce is running', 'color:red');
      // console.log('initOnce el', this.$refs.searchRef);
      if (window.ResizeObserver && this.$refs.searchRef) {
        resizeObserver.observe(this.$refs.searchRef);
        this.$once('hook:beforeDestroy', () => {
          resizeObserver.disconnect(this.$refs.searchRef);
        });
      }
      this.showControl = true;
    });
  },
  updated() {
    console.log('updated');
  },
  methods: {
    toggle() {
      this.expand = !this.expand;
    },
    onSearch() {
      this.$emit('search');
    },
    onReset() {
      this.$emit('reset');
    },
  },
};
</script>

<style lang="scss" scoped>
$right_width: 220px;
.hubary-search-frame {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  .hubary-search-form {
    width: calc(100% - #{$right_width});
    label {
      font-weight: 600;
    }
    ::v-deep .el-form-item {
      // width: 100%;
      .el-form-item__label {
        font-weight: 600;
      }
    }
  }
  .hubary-search-button {
    width: $right_width;
    .collapse-icon {
      display: inline-block;
      font-size: 12px;
      color: #409eff;
      margin-right: 10px;
      width: 43px;
    }
  }
}
</style>
