<!--
* @Author: hubary
* @Email:  hubary@qq.com
* @hubary-expand-search
-->
<template>
  <div
    class="hubary-search-frame"
    :class="{ 'height-animation': isAnimation }"
    :style="{
      height: boxHeight,
    }"
  >
    <div ref="wrapRef" class="hubary-search-form">
      <slot name="default"></slot>
    </div>
    <div class="hubary-search-button">
      <span class="collapse-icon">
        <a v-show="showExpandIcon" @click="toggle"
          >{{ expand ? '收起' : '展开' }}
          <i :class="!expand ? 'el-icon-arrow-right' : 'el-icon-arrow-down'" />
        </a>
      </span>
      <template v-if="$slots.buttons">
        <slot name="buttons"></slot>
      </template>
      <template v-else>
        <el-button :size="size" icon="el-icon-search" type="primary" @click="onSearch"
          >查询</el-button
        >
        <el-button :size="size" icon="el-icon-refresh-left" @click="onReset">重置</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
// import { debounce } from '../utils/index';
export default {
  name: 'HubaryExpandSearch',
  components: {},
  props: {
    oneItemHeight: {
      type: Number,
      default: 51,
    },
    // 默认展开还是收起
    expandDefault: {
      type: Boolean,
      default: false,
    },
    // 是否开启高度动画过渡
    isAnimation: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'small',
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
    wrapRef() {
      return this.$refs.wrapRef;
    },
    boxHeight() {
      if (this.expand) {
        return this.formHeight ? this.formHeight + 'px' : 'auto';
      }
      return this.oneItemHeight + 'px';
    },
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     const resizeObserver = new ResizeObserver(
  //       debounce((entries) => {
  //         for (const entry of entries) {
  //           // console.log("ResizeObserver entry", entry);
  //           this.$nextTick(() => {
  //             this.formHeight = entry.contentRect.height;
  //           });
  //         }
  //       }, 100)
  //     );
  //     // console.log('%c initOnce is running', 'color:red');
  //     // console.log('initOnce el', this.$refs.wrapRef);
  //     if (window.ResizeObserver && this.$refs.wrapRef) {
  //       resizeObserver.observe(this.$refs.wrapRef);
  //       this.$once('hook:beforeDestroy', () => {
  //         resizeObserver.disconnect(this.$refs.wrapRef);
  //       });
  //     } else {
  //       this.showControl = true;
  //     }
  //   });
  // },
  created() {
    this.expand = this.expandDefault;
  },
  mounted() {
    this.$nextTick(() => {
      addResizeListener(this.wrapRef, this.handleResize);
    });
  },
  beforeDestroy() {
    if (this.wrapRef && this.handleResize) removeResizeListener(this.wrapRef, this.handleResize);
  },
  methods: {
    handleResize() {
      const wrapRef = this.wrapRef;
      // console.log(wrapRef.getBoundingClientRect());
      if (!wrapRef) return;
      const height = wrapRef.getBoundingClientRect().height;
      this.formHeight = Math.ceil(parseFloat(height));
    },
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
.height-animation {
  transition: height 0.5s;
}
.hubary-search-frame {
  display: flex;
  overflow: hidden;
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
      > a:hover {
        cursor: pointer;
        color: inherit;
        text-decoration: none;
      }
    }
  }
}
</style>
