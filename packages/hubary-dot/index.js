/**
* @Author   han.liu10
* @Email    hubary@qq.com
* @hubary-dot   借鉴suning uxcool
**/
import './style.scss';
export default {
  name: 'HubaryDot',
  props: {
    prefixCls: {
      type: String,
      default: 'hubary-dot'
    },
    status: {
      type: String,
      validator(val) {
        return ['success', 'processing', 'default', 'error', 'warning'].indexOf(val) !== -1;
      },
      default: 'default'
    },
    size: {
      type: Number,
      default: 8
    },
    text: {
      type: String,
      default: '',
    },
    customStyle: Object,
  },
  data() {
    return {

    }
  },
  computed: {
    badgeClasses() {
      const { prefixCls, status } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-badge`]: status,
      };
    },
    statusClasses() {
      const { prefixCls, status } = this;
      return {
        [`${prefixCls}-status-dot`]: status,
        [`${prefixCls}-status-${status}`]: status,
      };
    },
    statusStyle() {
      const { size } = this;
      return {
        width: size + 'px',
        height: size + 'px'
      }
    }
  },
  render(h) {
    const { status, text, $slots, prefixCls, badgeClasses, customStyle, statusClasses, statusStyle } = this;
    const { default: slotDefault = [] } = $slots;
    const hasSlotDefault = slotDefault.length > 0;
    const textContent = h('span', { class: `${prefixCls}-status-text` }, text);
    if (!hasSlotDefault && status) {
      console.log('直接使用text')
      return h(
        'span',
        {
          class: [badgeClasses, 'no-slot'],
          style: customStyle,
        },
        [
          h('span', {
            class: statusClasses,
            style: statusStyle
          }),
          textContent,
        ]
      );
    }
    console.log('有slot-default使用text')
    return h(
      'span',
      {
        class: [badgeClasses, 'has-slot'],
      },
      [h('span', {
        class: statusClasses,
        style: statusStyle
      }),
      hasSlotDefault ? slotDefault : textContent]
    );
  }
}
