export default {
  /**
   * @description token在Cookie中存儲的天數，默認1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用國際化，默認為false
   *              如果不使用，則需要在路由中給需要在菜單中展示的路由設置meta: {title: 'xxx'}
   *              用來在菜單中顯示文字
   */
  useI18n: false,
  /**
   * @description api請求基礎路徑
   */
  baseUrl: {
    // dev: 'http://localhost:5000/',
    // pro: 'https://isms.bccs.com.tw:8001/'
    dev: '',
    pro: ''
  },
  /**
   * @description 默認打開的首頁的路由name值，默認為home
   */
  homeName: 'home',
  /**
   * @description 需要加載的插件
   */
  plugin: {
    // 'error-store': {
    //   showInHeader: true, // 設為false後不會在頂部顯示錯誤日誌徽標
    //   developmentOff: false // 設為true後在開發環境不會收集錯誤信息，方便開發中排查錯誤
    // }
  },
  updateDocsPath: '' + '/api/docsManage/Update_Docs',
  downLoadDocsPath: '' + '/api/DocsManage/Download_Docs/',
  sysHeighx: document.body.clientHeight,
  paraSetTypeList: [
    // {
    //   value: '全部',
    //   label: '全部'
    // },
    {
      value: '資產大小類別',
      label: '資產大小類別'
    },
    {
      value: '資產編碼原則',
      label: '資產編碼原則'
    },
    {
      value: '資產價值評估項',
      label: '資產價值評估項'
    },
    {
      value: '資產價值統計式',
      label: '資產價值統計式'
    },
    {
      value: '文件管理',
      label: '文件管理'
    },
    {
      value: '風險評估項',
      label: '風險評估項'
    },
    {
      value: '資通管理系統',
      label: '資通管理系統'
    }
  ]
}
