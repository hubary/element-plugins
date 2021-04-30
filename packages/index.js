import ElDialogLimit from './el-dialog-limit';
import HubarySearchExpand from './hubary-search-expand';
import HubaryDot from './hubary-dot';
import HubaryRemoteSearch from './hubary-remote-search';
const components = [ElDialogLimit, HubarySearchExpand, HubaryDot, HubaryRemoteSearch];

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  components.map((component) => Vue.component(component.name, component));
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version: '1.0.0',
  install,
  ElDialogLimit, HubarySearchExpand, HubaryDot, HubaryRemoteSearch
};
