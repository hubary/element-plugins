<template>
  <div
    class="m-form"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(150, 150, 150, 0.1)"
    v-loading="loading"
  >
    <el-form
      label-width="auto"
      :size="size"
      :ref="formRef"
      :rules="rules"
      :label-position="labelPosition"
      :inline="isInline ? true : false"
      :model="searchData"
    >
      <slot name="prepend"></slot>
      <template v-for="(item, index) in searchForm">
        <template v-if="item.type === 'slot'">
          <slot :name="item.prop" :rules="rules" :form="searchData"> </slot>
        </template>
        <template v-else>
          <el-form-item
            v-if="item.show === undefined || item.show ? true : false"
            :label-width="item.labelWidth ? item.labelWidth : 'auto'"
            :label="item.label"
            :key="`${index}-${item.prop}`"
            :prop="item.prop"
            :class="{
              'is-inline_textarea': item.type === 'Textarea' && isInline,
              'is-textarea': item.type === 'Textarea',
            }"
          >
            <!-- 输入框 -->
            <el-input
              clearable
              :readonly="item.readonly"
              v-if="item.type === 'Input' || item.type === 'Textarea'"
              :type="item.type === 'Textarea' ? 'textarea' : 'input'"
              :rows="item.type === 'Textarea' ? item.rows : ''"
              v-model.trim="searchData[item.prop]"
              :size="size"
              :suffix-icon="item.suffixIcon || ''"
              :prefix-icon="item.prefixIcon || ''"
              :autofocus="item.focus ? true : false"
              :disabled="item.disabled"
              :placeholder="
                item.placeholder === undefined ? `请输入${item.label}` : item.placeholder
              "
              :style="{ width: item.width }"
              @blur="item.blur && item.blur(searchData[item.prop])"
              @input="item.input && item.input(searchData[item.prop])"
            >
              <template v-if="item.append" slot="append">
                <slot-component
                  v-if="item.append.render"
                  class="c3 p12"
                  :render="item.append.render"
                ></slot-component>
                <span v-else class="c3 p12">{{ item.append.text || '' }}</span>
              </template>
              <template v-if="item.prepend" slot="prepend">
                <slot-component
                  v-if="item.prepend.render"
                  class="c3 p12"
                  :render="item.prepend.render"
                ></slot-component>
                <span v-else class="c3 p12">{{ item.prepend.text || '' }}</span>
              </template>
            </el-input>

            <!-- form 数字输入框 add by Liuhan 2020-11-04-->
            <!-- 用法示例productoperation_pricesystem_ui /pricesystem/tariffManage/priceDimension/priceDimension-add.vue维度长度 -->
            <el-input-number
              v-if="item.type === 'InputNumber'"
              :style="{ width: item.width }"
              v-model.trim="searchData[item.prop]"
              v-bind="item.attrs"
              v-on="item.on"
              :disabled="item.disabled"
              :class="`InputNumber-${item.align || 'center'}`"
            ></el-input-number>

            <!-- 上传文件及图片 -->
            <!-- <upload-model
            v-if="item.type === 'UploadModel'"
            :http="item.http"
            :fileList="searchData[item.prop]"
            :listType="item.listType"
            :accept="item.accept"
            :autoUpload="item.autoUpload"
            :showFileList="item.showFileList"
            :limit="item.limit"
            :limitSize="item.limitSize"
            :beforeUpload="item.beforeUpload"
            @uploadData="(val) => uploadData(item.ref, val)"
            :ref="item.ref"
            :multiple="item.multiple"
          /> -->

            <!-- 下拉框 -->
            <el-select
              clearable
              filterable
              :multiple="item.multiple ? true : false"
              :filter-method="item.filterMethod"
              :readonly="item.readonly"
              v-if="item.type === 'Select'"
              :disabled="item.disabled"
              :allow-create="item.allowCreate ? true : false"
              :placeholder="
                item.placeholder === undefined ? `请选择${item.label}` : item.placeholder
              "
              v-model.trim="searchData[item.prop]"
              :style="{ width: item.width }"
              :size="size"
              @change="item.change && item.change(searchData[item.prop])"
            >
              <el-option
                v-for="op in item.options"
                :label="op[item.labelKey || 'label']"
                :value="op[item.valueKey || 'value']"
                :key="op[item.valueKey || 'value']"
              >
              </el-option>
            </el-select>
            <!-- 单选 -->
            <el-radio-group
              @change="item.change && item.change(searchData[item.prop])"
              v-if="item.type === 'Radio'"
              v-model="searchData[item.prop]"
            >
              <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">
                {{ ra.label }}
              </el-radio>
            </el-radio-group>
            <!-- 单选按钮 -->
            <el-radio-group
              v-if="item.type === 'RadioButton'"
              v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])"
            >
              <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value"
                >{{ ra.label }}
              </el-radio-button>
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type === 'Checkbox'"
              :style="{ width: item.width }"
              v-model="searchData[item.prop]"
            >
              <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value"
                >{{ ch.label }}
              </el-checkbox>
            </el-checkbox-group>

            <!-- 日期 -->
            <el-date-picker
              v-if="
                [
                  'Date',
                  'date',
                  'year',
                  'month',
                  'date',
                  'dates',
                  'week',
                  'datetime',
                  'datetimerange',
                  'daterange',
                  'monthrange',
                ].includes(item.type)
              "
              :type="item.type !== 'Date' ? item.type : 'date'"
              :disabled="item.disabled"
              :value-format="item.valueFormat"
              :readonly="item.readonly"
              :style="{ width: item.width }"
              :placeholder="item.placeholder"
              :picker-options="item.pickerOptions"
              v-model.trim="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])"
            ></el-date-picker>
            <!-- 固定时间点 -->
            <el-time-select
              v-if="item.type === 'TimeSelect'"
              :value-format="item.valueFormat"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :style="{ width: item.width }"
              :placeholder="item.placeholder"
              :picker-options="item.pickerOptions"
              v-model.trim="searchData[item.prop]"
            ></el-time-select>
            <!-- 任意时间点-->

            <el-time-picker
              :is-range="item.isRange"
              v-if="item.type === 'Time'"
              :value-format="item.valueFormat"
              :format="item.format"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :style="{ width: item.width }"
              :placeholder="item.placeholder"
              :picker-options="item.pickerOptions"
              v-model.trim="searchData[item.prop]"
            >
            </el-time-picker>
            <!-- 日期时间 -->
            <el-date-picker
              v-if="item.type === 'DateTime'"
              :value-format="item.valueFormat"
              type="datetime"
              :readonly="item.readonly"
              :style="{ width: item.width }"
              :placeholder="item.placeholder"
              :picker-options="item.pickerOptions"
              v-model.trim="searchData[item.prop]"
              :disabled="item.disable && item.disable(searchData[item.prop])"
            ></el-date-picker>
            <!-- 滑块 -->
            <el-slider
              :disabled="item.disabled"
              v-if="item.type === 'Slider'"
              v-model="searchData[item.prop]"
            >
            </el-slider>
            <!-- 开关 -->
            <el-switch
              v-if="item.type === 'Switch'"
              :disabled="item.disabled"
              :active-text="item.active"
              :inactive-text="item.inactive"
              v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])"
            >
            </el-switch>
            <!-- 输入框搜索 -->
            <el-input
              clearable
              v-if="item.type === 'InputHandle'"
              v-model.trim="searchData[item.prop]"
              :size="size"
              :placeholder="item.placeholder"
              :style="{ width: item.width }"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :type="item.typetext"
              @blur="item.blur && item.blur(searchData[item.prop])"
              @input="item.input && item.input(searchData[item.prop])"
            >
              <el-button
                class="inputButton"
                slot="append"
                style="color: #ffffff"
                :type="item.buttonType"
                :icon="item.buttonIcon"
                :disabled="item.buttonDisabled"
                @click="item.buttonClick"
              >
                {{ item.buttonText }}
              </el-button>
            </el-input>
            <!-- 级联选择器-->
            <el-cascader
              v-if="item.type === 'Cascader'"
              :style="{ width: item.width }"
              :disabled="item.disabled"
              filterable
              v-model.trim="searchData[item.prop]"
              :placeholder="item.placeholder"
              :separator="item.separator"
              :checkStrictly="item.checkStrictly"
              :options="item.options"
              :readonly="item.readonly"
              :filter-method="item.filterMethod"
              :node-key="item.nodeKey"
              :before-filter="item.beforeFilter"
              :props="item.props"
              :ref="item.ref"
              :show-all-levels="item.showAllLevels"
              @change="item.change && item.change(searchData[item.prop])"
            ></el-cascader>
            <!-- 文本 -->
            <p class="c3 p12" v-if="item.type === 'Text'" :style="{ width: item.width }">
              {{ searchData[item.prop] }}
            </p>

            <!--自定义-->
            <slot-component
              v-if="item.type === 'Slot'"
              class="c3 p12"
              :render="item.render"
            ></slot-component>
          </el-form-item>
        </template>
      </template>
      <slot name="append"></slot>
      <!-- 操作 -->
      <el-form-item v-if="isHandle" label-width="0">
        <el-button
          :loading="item.loading"
          :disabled="item.loading || item.disabled"
          v-for="item in searchHandle"
          :key="item.label"
          :icon="item.icon"
          :type="item.type"
          :size="item.size || size"
          @click="item.handle"
        >
          {{ item.label }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 自定义内容的组件
let slotComponent = {
  functional: true,
  props: {
    render: Function,
  },
  render: (h, data) => {
    return data.props.render(h, data);
  },
};
export default {
  name: 'FormView',
  components: {
    slotComponent,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    //是否行内显示
    isInline: {
      type: Boolean,
      default: false,
    },
    //表单域标签的位置
    labelPosition: {
      type: String,
      default: 'right',
      validator(type) {
        if (type && !['right', 'left', 'top'].includes(type)) {
          console.error('labelPosition类型必须为:' + ['right', 'left', 'top'].join('、'));
        }
        return true;
      },
    },
    //ref
    formRef: {
      type: String,
      default: 'inlineForm',
    },
    //rules
    rules: {
      type: Object,
      default: () => {
        return {};
      },
    },
    //是否有操作行
    isHandle: {
      type: Boolean,
      default: true,
    },
    //操作行信息
    searchHandle: {
      type: Array | Object,
      default: () => [],
    },
    //form表单
    searchForm: {
      type: Array,
      default: () => [],
    },
    //form表单数据
    searchData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  computed: {},
  methods: {
    //获取上传数据
    // uploadData(ref, val) {
    //   var obj = {
    //     obj: ref,
    //   };
    //   Object.assign(val, obj);
    //   this.$emit('uploadData', val);
    // },
  },
};
</script>
<style lang="scss">
.m-form {
  .el-form {
    .el-radio__label {
      font-size: 12px;
    }
    .el-form-item__label {
      font-size: 12px;
    }
    &.el-form--inline {
      .el-form-item {
        margin-right: 30px;

        &.left {
          display: flex;
          justify-content: flex-start;
        }

        &.m-form_block {
          .el-form-item__label-wrap {
            margin-left: 0 !important;

            .el-form-item__label {
              text-align: left;
            }
          }
        }
      }
    }

    .el-form-item {
      &.is-textarea {
        &.is-inline_textarea {
          display: flex;
          margin-right: 0;
          justify-content: flex-start;

          .el-form-item__content {
            flex: 1;
          }
        }
      }

      .el-form-item__label {
        font-weight: normal;
        min-width: 100px;
      }

      .inputButton {
        .el-input-group__append {
          color: #fff;
        }
      }
    }
  }
  .form-item-collapse {
    display: flex;
    .collapse-block {
      flex: 1;
    }
    .el-form-item.form-item-collapse-btn-group {
      margin-left: 5px;
      width: 165px;
      margin-right: 0;
    }
  }
}

/* add by LiuHan */
.InputNumber-left .el-input .el-input__inner {
  text-align: left !important;
}
.InputNumber-right .el-input .el-input__inner {
  text-align: right !important;
}
.InputNumber-center .el-input .el-input__inner {
  text-align: center !important;
}
</style>
