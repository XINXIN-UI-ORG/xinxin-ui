import type { App } from 'vue'

import Add from './src/add.vue'

import Alert from './src/alert.vue'

import ArrowRight from './src/arrow-right.vue'

import Arrow from './src/arrow.vue'

import AuthSuccess from './src/auth-success.vue'

import Auth from './src/auth.vue'

import Calendar from './src/calendar.vue'

import Checked from './src/checked.vue'

import CloseSelect from './src/close-select.vue'

import Close from './src/close.vue'

import Components from './src/components.vue'

import Document from './src/document.vue'

import DownSelect from './src/down-select.vue'

import Down from './src/down.vue'

import ErrorMessage from './src/error-message.vue'

import Error from './src/error.vue'

import Execute from './src/execute.vue'

import Fail from './src/fail.vue'

import File from './src/file.vue'

import Indeterminate from './src/indeterminate.vue'

import InfoMessage from './src/info-message.vue'

import Left from './src/left.vue'

import Load from './src/load.vue'

import Loading from './src/loading.vue'

import NoData from './src/no-data.vue'

import PasswordHide from './src/password-hide.vue'

import PasswordShow from './src/password-show.vue'

import Refresh from './src/refresh.vue'

import Restart from './src/restart.vue'

import Right from './src/right.vue'

import Rocket from './src/rocket.vue'

import Search from './src/search.vue'

import SourceCode from './src/source-code.vue'

import Star from './src/star.vue'

import SuccessMessage from './src/success-message.vue'

import Success from './src/success.vue'

import Time from './src/time.vue'

import Top from './src/top.vue'

import Up from './src/up.vue'

import Upload from './src/upload.vue'

import WarningMessage from './src/warning-message.vue'

const componentList = [
  Add,
  Alert,
  ArrowRight,
  Arrow,
  AuthSuccess,
  Auth,
  Calendar,
  Checked,
  CloseSelect,
  Close,
  Components,
  Document,
  DownSelect,
  Down,
  ErrorMessage,
  Error,
  Execute,
  Fail,
  File,
  Indeterminate,
  InfoMessage,
  Left,
  Load,
  Loading,
  NoData,
  PasswordHide,
  PasswordShow,
  Refresh,
  Restart,
  Right,
  Rocket,
  Search,
  SourceCode,
  Star,
  SuccessMessage,
  Success,
  Time,
  Top,
  Up,
  Upload,
  WarningMessage,
]

const install: any = (app: App) => {
  componentList.forEach((component: any) => {
    if (component.install) {
      // 执行每个组件的install方法
      app.use(component)
    }
    app.component(component.name, component)
  })
}

export default {
  install,
}

export {
  Add,
  Alert,
  ArrowRight,
  Arrow,
  AuthSuccess,
  Auth,
  Calendar,
  Checked,
  CloseSelect,
  Close,
  Components,
  Document,
  DownSelect,
  Down,
  ErrorMessage,
  Error,
  Execute,
  Fail,
  File,
  Indeterminate,
  InfoMessage,
  Left,
  Load,
  Loading,
  NoData,
  PasswordHide,
  PasswordShow,
  Refresh,
  Restart,
  Right,
  Rocket,
  Search,
  SourceCode,
  Star,
  SuccessMessage,
  Success,
  Time,
  Top,
  Up,
  Upload,
  WarningMessage,
}
