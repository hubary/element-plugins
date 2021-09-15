<template>
  <div class="m-table" :style="{ height: height }">
    <el-table
      ref="tableView"
      v-loading="loading"
      :size="size"
      :height="innerHeight"
      :max-height="height === 'auto' ? 400 : null"
      :data="tableData"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(150, 150, 150, 0.1)"
      :span-method="spanMethod"
      :border="isBorder"
      tooltip-effect="dark"
      :stripe="isStripe"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      :tree-props="treeProps"
      :lazy="lazy"
      :row-key="rowKey"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
      :load="load"
      :row-style="rowStyle"
      :checked-radio="checkedRadio"
      header-row-class-name="table-header-row"
      @select="handleSelection"
      @select-all="handleSelectionAll"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      @cell-click="cellClick"
      @row-dblclick="rowDblClick"
      @row-click="rowClick"
    >
      <!-- 单选列 -->
      <el-table-column v-if="isRadio" fixed width="50">
        <template slot-scope="scope">
          <el-radio
            v-model="radio"
            :label="currentPage.toString() + scope.$index.toString()"
            @change.native="getSelected(scope.row)"
            >{{ " " }}
          </el-radio>
        </template>
      </el-table-column>
      <!-- 多选列  -->
      <el-table-column
        v-if="isCheckbox"
        fixed
        type="selection"
        :selectable="selectable"
        width="55"
        align="center"
      />
      <!-- 序号列 -->
      <el-table-column
        v-if="isOrder"
        fixed
        type="index"
        width="55"
        label="序号"
        align="center"
        :index.sync="indexMethod"
      />
      <!-- 表头列 -->
      <template v-for="(tHeaderItem, index) in columns">
        <el-table-column
          v-if="
            tHeaderItem.show === undefined || tHeaderItem.show ? true : false
          "
          :key="tHeaderItem.prop"
          :header-align="
            tHeaderItem.headerAlign || tHeaderItem.align || headerAlign
          "
          :sortable="tHeaderItem.sortable ? 'custom' : false"
          :fixed="tHeaderItem.fixed ? tHeaderItem.fixed : false"
          show-overflow-tooltip
          :resizable="tHeaderItem.resizable ? true : false"
          :align="tHeaderItem.align ? tHeaderItem.align : columnAlign"
          :prop="tHeaderItem.prop"
          :label="tHeaderItem.label"
          :width="tHeaderItem.width ? tHeaderItem.width : 'auto'"
          :min-width="tHeaderItem.minWidth ? tHeaderItem.minWidth : 'auto'"
        >
          <template slot-scope="scope">
            <ex-slot
              v-if="tHeaderItem.render"
              :render="tHeaderItem.render"
              :row="scope.row"
              :index="scope.$index"
              :column="tHeaderItem"
            />
            <!-- 需要格式化的数据结构 -->
            <span v-else-if="tHeaderItem.format">{{
              scope.row[tHeaderItem.prop] | formatters(tHeaderItem.format)
            }}</span>
            <!-- 纯展示数据 -->
            <span v-else>{{ scope.row[tHeaderItem.prop] }}</span>
          </template>
        </el-table-column>
      </template>
      <!-- 操作列start -->
      <el-table-column
        v-if="operateObj.list.length !== 0"
        fixed="right"
        label="操作"
        :align="operateObj.align || 'center'"
        :width="operateObj.width ? operateObj.width : '200'"
        :formatter="handleformatter"
      >
        <template slot-scope="scope">
          <div
            :class="`operate operate-${
              operateObj.columnAlign || operateObj.align
            }`"
          >
            <template
              v-for="item in operateList(scope.row).slice(0, operateSlice)"
            >
              <a
                v-if="isActionShow(item.isShow, scope.row)"
                :key="item.id"
                class="p12 c6"
                :title="item.label"
                :style="{ color: theme }"
                href="javascript:;"
                @click="operate(scope.$index, scope.row, item)"
              >
                {{ item.label }}
              </a>
            </template>

            <el-dropdown v-if="operateList(scope.row).length > operateSlice">
              <a class="p12 c6" :style="{ color: theme }">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in operateList(scope.row).slice(operateSlice)"
                  :key="item.id"
                  @click.native="
                    () => {
                      operate(scope.$index, scope.row, item);
                    }
                  "
                  >{{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
      <!-- 操作列end -->
      <!-- 自定义操作列 -->
      <slot name="extra" />
    </el-table>
    <!-- 分页 -->
    <div v-if="isPage" class="page">
      <el-pagination
        background
        :current-page.sync="curPage"
        :page-size="pageSize"
        :pager-count="pagerCount"
        :page-sizes="pageSizes"
        :layout="pageLayout"
        popper-class="m-pag_item"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { has, isFunction } from "lodash-es";
// 自定义内容的组件
var exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index,
    };
    if (data.props.column) params.column = data.props.column;
    return data.props.render(h, params);
  },
};
export default {
  name: "TableView",
  components: { exSlot },
  filters: {
    formatters(val, format) {
      if (typeof format === "function") {
        return format(val);
      } else return val;
    },
  },
  props: {
    // 表格高度
    height: {
      type: String,
      default: "100%",
    },
    // 是否显示合计行
    showSummary: {
      type: Boolean,
      default: false,
    },
    // 自定义合计逻辑
    summaryMethod: {
      type: Function,
      default: null,
    },
    // 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
    selectable: {
      type: Function,
      default: null,
    },
    // 是否显示loading
    loading: {
      type: Boolean,
      default: false,
    },
    // 是否带边框
    isBorder: {
      type: Boolean,
      default: false,
    },
    // 是否带斑马纹
    isStripe: {
      type: Boolean,
      default: false,
    },
    // 是否显示序号
    isOrder: {
      type: Boolean,
      default: true,
    },
    // 是否合并单元格
    isSpanMethod: {
      type: Boolean,
      default: false,
    },
    operateSlice: {
      type: Number,
      default: 2,
    },
    // 是否有操作列
    operateObj: {
      type: Object,
      default: () => {
        return {
          width: {
            type: Number,
            default: "200px",
          },
          list: [
            // {label:"",id:""}
          ],
        };
      },
    },
    // 是否单选
    isRadio: {
      type: Boolean,
      default: false,
    },
    // 是否多选
    isCheckbox: {
      type: Boolean,
      default: false,
    },
    headerAlign: {
      type: String,
      default: "left",
    },
    columnAlign: {
      type: String,
      default: "left",
    },
    // 行数据的 Key，用来优化 Table 的渲染；
    // 在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。
    // 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
    rowKey: {
      type: Function | String,
    },
    // 是否懒加载子节点数据
    lazy: {
      type: Boolean,
      default: false,
    },
    // 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息
    load: {
      type: Function,
      default: () => {},
    },
    // 渲染嵌套数据的配置选项
    treeProps: {
      type: Object,
      default: function () {
        return {
          hasChildren: "hasChildren",
          children: "children",
        };
      },
    },
    // 是否点击
    isClick: {
      type: Boolean,
      default: false,
    },
    // 表头数据
    columns: {
      type: Array,
      default: function () {
        return [
          {
            prop: "",
            label: "",
            // 是否需要排序
            sortable: {
              type: Boolean,
              default: false,
            },
            // 是否需要固定
            fixed: {
              type: Boolean,
              default: false,
            },
          },
        ];
      },
    },
    // 表数据
    tableData: {
      type: Array,
      default: () => [],
    },
    // 是否有分页
    isPage: {
      type: Boolean,
      default: true,
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1,
    },
    pagenationLayout: {
      type: String,
      require: false,
    },
    // 总条数
    total: {
      type: Number,
      default: 0,
    },
    // 每条页数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 单选中的行
    checkedRadio: {
      type: Object,
      validator(obj) {
        if (!Object.keys(obj).length) {
          console.error("checkedRadio不能为空对象且isRadio为true");
        }
        return true;
      },
    },
  },
  data() {
    return {
      radio: "",
      // 表格高度
      innerHeight: null,
      // 表头单元格设置Style
      // 为所有单元格设置Style
      cellStyle: {
        textAlign: "center",
      },
      isFunction: (val) => {
        return isFunction(val);
      },
      // 单选回显时点击数据
      checkedRadioTurn: true,
    };
  },

  computed: {
    curPage: {
      get() {
        return this.currentPage;
      },
      set(val) {
        return this.currentPage;
      },
    },
    operateList() {
      return (rowData) => {
        const resultOperate = [];
        this.operateObj.list.forEach((item) => {
          if (this.isActionShow(item.isShow, rowData)) {
            resultOperate.push(item);
          }
        });
        return resultOperate;
      };
    },
    headerCellStyle() {
      return {
        // // color: this.$store.state.settings.tableStyle.tableColor,
        // fontWeight: "400",
        // backgroundColor:
        //   this.$store.state.settings.tableStyle.tableHeaderBackgroundColor,
        // borderTop: `1px solid ${this.$store.state.settings.tableStyle.tableBorderTop}`,
      };
    },
    // 分页组件每页显示条数
    pageSizes() {
      return this.$store.state.settings.pageSizes;
    },
    // 分页layout配置
    pageLayout() {
      return this.pagenationLayout
        ? this.pagenationLayout
        : this.$store.state.settings.pageLayout;
    },
    // 分页页码按钮的数量
    pagerCount() {
      return this.$store.state.settings.pagerCount;
    },
    size() {
      return this.$store.state.settings.size;
    },
    theme() {
      return this.$store.state.settings.theme;
    },
  },

  watch: {
    // 监听表内容的数据  动态计算table高度
    tableData: {
      handler(newArr, oldArr) {
        const $self = this;
        if (this.height === "auto") {
          $self.innerHeight = null;
        } else {
          $self.isPage
            ? ($self.innerHeight = `calc(${this.height} - 75px)`)
            : ($self.innerHeight = this.height);
        }
        this.showRadioTableData();
        this.$nextTick(() => {
          // 触发表格重绘
          this.$refs.tableView.doLayout();
        });
      },
      deep: true,
      immediate: true,
    },
    // 监听单选数据改变，触发表格重绘
    checkedRadio: {
      handler(newArr, oldArr) {
        this.showRadioTableData();
        this.$nextTick(() => {
          this.$refs.tableView.doLayout();
        });
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    // 判断按钮是否显示
    isActionShow: (callBack, data) => {
      if (callBack !== undefined) {
        return callBack(data);
      } else {
        return true;
      }
    },
    // 排序函数
    sortChange(column, prop, order) {
      if (column.order === null || column.order === undefined) return;
      console.log(column);
      console.log(column.prop + "-" + column.order);
      this.$emit("getChildprop", column.prop);
    },

    // 自定义索引
    indexMethod(index) {
      return (this.curPage - 1) * this.pageSize + (index + 1);
    },

    // 单条数据 Checkbox 触发的事件
    handleSelection(selection, row) {
      this.$emit("getSelection", { selection, row });
    },

    // 勾选全选 Checkbox 触发的事件
    handleSelectionAll(selection) {
      this.$emit("getSelectionAll", selection);
    },

    // 多选事件
    handleSelectionChange(val) {
      this.$emit("getChildSelectionList", val);
    },

    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`);
      // 将页码发送给父组件  父组件发送请求给后台  重新获取数据
      this.$emit("changePage", null, pageSize);
    },

    handleCurrentChange(currentPage) {
      console.log(`当前页: ${currentPage}`);
      // 将页码发送给父组件  父组件发送请求给后台  重新获取数据
      this.$emit("changePage", currentPage, null);
    },

    /**
     * @Descripttion 操作列事件方法
     * @param index当前列的下标
     * @param param当前列的数据
     * @param operate 具体被操作元素的数据，
     *
     */
    operate(index, param, operate) {
      this.$emit("operate", {
        index: index,
        row: param,
        operate: operate,
      });
    },

    // 单选点击事件
    getSelected(row) {
      this.checkedRadioTurn = false;
      this.$emit("changeRadio", row);
    },

    // 合并单元格
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.isSpanMethod) {
        return this.$parent.spanMethod({ row, column, rowIndex, columnIndex });
      }
    },

    rowStyle: function () {
      // 如果此行能点击，则添加小手样式
      if (this.isClick) {
        return {
          cursor: "pointer",
        };
      }
    },

    // 格式化内容方法
    handleformatter(row, column, cellValue, index) {
      console.log(row);
    },

    // 当某个单元格被点击时会触发该事件
    cellClick(row, column, cell, event) {
      if (this.isClick && this.isRadio) {
        this.radio = row.order - 1;
        this.$emit("getChildcur", row.order - 1);
      } else if (this.isClick && !this.isRadio) {
        this.$emit("getChildIndex", row.order - 1);
      }
    },

    // 当某一行被点击时会触发该事件
    rowClick(row, column, event) {
      const data = {
        row: row,
        column: column,
      };
      this.$emit("getClickdata", data);
    },

    // 当某一行被点击时会触发该事件
    rowDblClick(row, column, event) {
      const data = {
        row: row,
        column: column,
      };
      this.$emit("getDbldata", data);
    },

    // 单选table需要回显选中的数据
    showRadioTableData() {
      if (
        this.isRadio &&
        this.tableData.length &&
        this.checkedRadioTurn &&
        this.checkedRadio &&
        JSON.stringify(this.checkedRadio) !== "{}"
      ) {
        this.$nextTick(() => {
          const key = Object.keys(this.checkedRadio)[0];
          let num = null;
          const result = this.tableData.find((item, index) => {
            if (item[key] === this.checkedRadio[key]) {
              num = index;
              return item;
            }
          });
          if (result && JSON.stringify(result) !== "{}") {
            this.$set(this, "radio", `${this.currentPage}${num}`);
          }
        });
      }
    },
  },
};
</script>
<style scoped="scoped" lang="scss">
.m-table {
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;

  ::v-deep .el-table {
    td.is-right,
    th.is-right {
      text-align: right !important;
    }

    td.is-left,
    th.is-left {
      text-align: left !important;
    }

    td.is-center,
    th.is-center {
      text-align: center !important;
    }
  }
  ::v-deep .el-table__fixed-right-patch {
    top: 0;
    display: none;
  }
  ::v-deep .el-table__body-wrapper {
    min-height: 40px;
  }

  div.operate {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    a,
    .el-dropdown > a {
      font-size: 12px;

      & ~ a,
      & ~ .el-dropdown {
        margin-left: 5px;
      }

      display: inline-block;
      padding: 0 5px;
    }
  }
  div.operate.operate-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
  }

  .page {
    box-sizing: border-box;
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px 0 20px;

    ::v-deep .el-pagination {
      font-weight: normal;
      // .el-pager {
      // li {
      //   padding: 0;
      //   background: #FFFFFF;
      //   border: 1px solid #CFD5E4;
      //   border-radius: 2px;
      //   border-radius: 2px;

      //   & + li {
      //     margin-left: 5px;
      //   }

      //   &.active {
      //     // color: #fff;
      //   }
      // }
      // }
    }
  }
}
</style>
