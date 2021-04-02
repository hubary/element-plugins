import ElDialogLimit from './el-dialog-limit';
import HubarySearchExpand from './hubary-search-expand';
const components = [ElDialogLimit, HubarySearchExpand];

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  components.map((component) => Vue.component(component.name, component));
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version: '0.0.1',
  install,
  ElDialogLimit,
  HubarySearchExpand,
};
