import Vue, { PluginObject } from 'vue'
import { ElementUIComponent, ElementUIComponentSize } from './component'
import { ElDialogLimit } from './el-dialog-limit'
/** Dialog Component */
export class DialogLimit extends ElDialogLimit { }
export interface InstallationOptions {
  locale: any,
  i18n: any,
  size: string
}

/** The version of element-ui */
export const version: string

/**
 * Install all element-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(ElementUI)` to install.
 */
export function install(vue: typeof Vue, options: InstallationOptions): void

/** ElementUI component common definition */
export type Component = ElementUIComponent

/** Component size definition for button, input, etc */
export type ComponentSize = ElementUIComponentSize
