import ElDialogLimit from './el-dialog-limit';
import HubarySearchExpand from './hubary-expand-search';
import HubaryDot from './hubary-dot';
import HubaryRemoteSearch from './hubary-remote-search';
import packageV from '../package.json'
// console.log('npm_package_version', packageV.version)
const components = [
  ElDialogLimit,
  HubarySearchExpand,
  HubaryDot,
  HubaryRemoteSearch
];
const install = function (Vue, opts = {}) {
  if (install.installed) return;
  components.map((component) => Vue.component(component.name, component));
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  version: packageV.version,
  install,
  ElDialogLimit, HubarySearchExpand, HubaryDot, HubaryRemoteSearch
};
