import { Dialog } from 'element-ui';
import './index.scss';
/**
 * @Author   hubary
 * @Email    hubary@qq.com
 * @Description   el-dialog定制化高阶组件,用于统一弹窗样式以及大小
 **/
export default {
  name: 'ElDialogLimit',
  props: {
    ...Dialog.props,
    // 目前只提供者三种弹窗尺寸
    size: {
      type: String,
      default: 'small',
      validator(type) {
        if (type && !['medium', 'small', 'mini', 'fullscreen'].includes(type)) {
          console.error('size类型必须为:' + ['medium', 'small', 'mini', 'fullscreen'].join('、'));
        }
        return true;
      },
    },
    sizeConfig: {
      type: Object,
      default: () => {
        return {
          mini: '410px',
          small: '590px',
          medium: '850px',
          fullscreen: '100%',
        };
      },
    },
    // 是否可以通过点击 modal 关闭 Dialog,默认关闭,防止误触
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    // chrome是否美化滚动条
    beautifyScrool: {
      type: Boolean,
      default: true,
    },
    // 弹窗loading
    loading: {
      type: Boolean,
      default: false,
    },
    // 整个弹窗loading配置
    loadingOptions: {
      default: () => ({}),
      type: Object,
    },
    top: {
      type: String,
      default: '12vh',
    },
  },
  data() {
    return {
      loadingInstance: null, //  Loading 服务实例
    };
  },
  computed: {
    thisWidth() {
      const { size = 'mini', sizeConfig } = this;
      let num = sizeConfig[size] || '410px';
      if (this.size === 'medium') {
        if (this.$el && this.$el.firstChild) {
          this.$el.firstChild.style.height = '70%';
        }
        if (document.querySelector('.el-dialog__body')) {
          document.querySelector('.el-dialog__body').style.maxHeight = 'calc(100% - 112px)';
          document.querySelector('.el-dialog__body').style.overflowY = 'auto';
        }
      } else if (this.size === 'small') {
        if (this.$el && this.$el.firstChild) {
          this.$el.firstChild.style.height = 'auto';
        }
        if (document.querySelector('.el-dialog__body')) {
          document.querySelector('.el-dialog__body').style.maxHeight = 'auto';
        }
      } else if (this.size === 'fullscreen') {
        if (this.$el && this.$el.firstChild) {
          this.$el.firstChild.style.height = '100%';
          this.$el.firstChild.style.maxHeight = '100%';
        }
        if (document.querySelector('.el-dialog__body')) {
          document.querySelector('.el-dialog__body').style.maxHeight = '100%';
          document.querySelector('.el-dialog__body').style.overflowY = 'auto';
        }
      } else {
        if (this.$el && this.$el.firstChild) {
          this.$el.firstChild.style.height = 'auto';
        }
        if (document.querySelector('.el-dialog__body')) {
          document.querySelector('.el-dialog__body').style.maxHeight = 'auto';
        }
      }
      return num;
    },
    currentLoadingOptions() {
      const defaultOptions = {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.7)',
        target: '.el-dialog__wrapper[visible=visible] .el-dialog',
      };
      Object.assign(defaultOptions, this.loadingOptions);
      return defaultOptions;
    },
  },
  created() {},
  watch: {
    loading: {
      handler(newVal, oldVal) {
        try {
          if (newVal && !oldVal) {
            this.loadingInstance = this.$loading(this.currentLoadingOptions);
          } else if (oldVal && !newVal && this.loadingInstance) {
            this.loadingInstance.close();
          }
        } catch (error) {
          if (this.loadingInstance) {
            this.loadingInstance.close();
          }
          this.loadingInstance = null;
        }
      },
      immediate: true,
    },
    'currentLoadingOptions.text'(newVal, oldVal) {
      if (newVal !== oldVal && this.loadingInstance) {
        if (typeof this.loadingInstance.setText === 'function') {
          this.loadingInstance.setText(newVal);
        }
      }
    },
  },
  beforeDestroy() {
    if (this.loadingInstance) {
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
  },
  render(h) {
    const slots = Object.keys(this.$slots)
      .reduce((arr, key) => arr.concat(this.$slots[key]), [])
      .map((vnode) => {
        // console.log('el-dialog-limit slot',vnode)
        if (vnode.data && ['title', 'footer'].includes(vnode.data.slot)) {
          vnode.context = this._self;
        }
        return vnode;
      });
    return h(
      Dialog,
      {
        on: this.$listeners,
        attrs: this.$attrs,
        props: {
          ...this.$props,
          width: this.thisWidth,
          target: '.el-dialog__body',
          fullscreen: this.size === 'fullscreen',
        },
        class: {
          'han-dialog-limit': true,
          'beautify-scrool': this.beautifyScrool,
          'han-dialog-limit-fullscreen': this.size === 'fullscreen',
        },
      },
      slots
    );
  },
};
