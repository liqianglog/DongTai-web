export default {
  menu: {
    home: '首页',
    login: '登录',
    project: '项目配置',
    projectDetail: '项目详情',
    vuln: '应用漏洞',
    vulnList: '应用漏洞列表',
    vulnDetail: '应用漏洞详情',
    sca: '组件管理',
    scaList: '组件管理列表',
    scaDetail: '组件管理详情',
    setting: '系统配置',
    agentManage: '引擎管理',
    strategyManage: '策略管理',
    upgradeOnline: '系统升级',
    sysInfo: '系统信息',
    changePassword: '密码修改',
    logManage: '操作日志',
    user: '角色管理',
  },
  views: {
    login: {
      title: '用户登录',
      subTitle: '欢迎使用IAST系统',
      user: '账号',
      usernamePlaceholder: '请输入账号，默认admin',
      password: '密码',
      passwordPlaceholder: '请输入密码，默认admin',
      captcha: '验证码',
      captchaPlaceholder: '请输入验证码',
    },
    vulnList: {
      filter: '过滤器',
      language: '语言',
      level: '等级',
      type: '类型',
      reset: '重置',
      resetAll: '重置全部',
      project_name: '项目',
      orderOptions: {
        type: '漏洞类型',
        level: '漏洞等级',
        url: 'url',
        latest_time: '最新上报时间',
        first_time: '首次上报时间',
      },
    },
    vulnDetail: {
      baseInfo: '基本信息',
      vulnDesc: '漏洞描述',
      export: '导出',
      delete: '删除',
      httpRequest: 'HTTP请求',
      codeDemo: '漏洞代码示例',
      graphy: '污点流图',
      suggest: '修复建议',
      appInfo: '应用信息',
      devEnv: '运行时环境',
      path: '环境变量',
      url: 'url',
      first_time: '首次出现',
      serverIp: '服务器 IP',
      clientIp: '来源 IP',
      language: '语言',
      port: '端口',
      projectName: '项目',
      level: '等级',
      counts: '出现次数',
      type: '类型',
      fileAndNum: '文件及行号',
      wuDianZhi: '污点值',
      route: '路径',
      middleware: '中间件',
      command: '启动命令',
      other: '其他',
    },
    scaList: {
      filter: '过滤器',
      language: '语言',
      level: '等级',
      type: '类型',
      reset: '重置',
      resetAll: '重置全部',
      project_name: '项目',
      orderOptions: {
        project_name: '项目名称',
        level: '风险等级',
        package_name: '包名',
        version: '版本',
        language: '语言',
        vul_count: '风险数量',
      },
      tableHeaders: {
        name: '组件名称',
        version: '组件版本',
        application: '所属应用',
        language: 'language',
        level: '安全等级',
        count: '漏洞数量',
        time: '发现时间',
      },
    },
    scaDetail: {
      version: '版本',
      level: '风险',
      project_name: '项目',
      vul_count: '漏洞数量',
      unit: '个',
      signature_value: '文件哈希',
      vulList: '漏洞列表',
      cveNumber: 'CVE 编号',
      cweNumber: 'CWE 编号',
      vulName: '漏洞名称',
      vulLevel: '漏洞等级',
      safeVersion: '安全版本',
      operate: '操作',
      detail: '详情',
      vulDetail: {
        title: '漏洞详情',
        num: '漏洞编号',
        name: '漏洞名称',
        desc: '漏洞概述',
        detail: '漏洞细节',
      },
    },
    changePassword: {
      username: '用户名',
      oldPassword: '旧密码',
      newPassword: '新密码',
      confirmNewPassword: '确认新密码',
      submit: '确认',
    },
    agentManage: {
      address: '服务器地址',
      payload: '服务器负载',
      status: '运行状态',
      manage: '管理',
      owner: '负责人',
      timestapm: '时间'
    },
    strategyManage: {
      name: '策略名称',
      detail: '策略详情',
      status: '启用状态',
      operate: '操作',
    },
    upgradeOnline: {
      online: '在线升级',
      onlineDesc:
        '在线升级需要连接公网，访问动态IAST的远程升级服务器，请确保当前机器可访问公网。',
      address: '升级服务器地址',
      onlineSubmit: '立即升级',
      offline: '离线升级',
      offlineDesc:
        '请联系火线平台售后支持，获取最新的离线安装包，然后上传离线安装包进行升级',
      select: '选择离线安装包',
      offlineSubmit: '上传并升级',
    },
    sysInfo: {
      infoTitle: '授权信息',
      infolicense: '',
    },
    projectManage: {
      title: '项目列表',
      name: '项目名称',
      vul: '漏洞',
      agent: 'Agent数量',
      owner: '负责人',
      time: '最新时间',
      manage: '管理',
    },
    projectEdit: {
      title: '基本设置',
      name: '项目名称',
      namePlaceholder: '请输入项目名称',
      mode: '扫描模式',
      mode1: '插桩模式',
      mode2: '流量模式',
      agent: '选择Agent',
      agentPlaceholder: '请选择Agent',
      scan: '扫描策略',
      scanPlaceholder: '请选择扫描策略',
      scanAdd: '新增策略模板',
      added: '已添加',
      submit: '保存',
    },
    projectDetail: {
      mode: '扫描模式',
      latest_time: '最新时间',
      projectDesc: '项目概况',
      projectVul: '项目漏洞',
      vulNum: '漏洞数量',
      type: '类型分布',
      owner: '负责人',
    },
    userList: {
      keywordPlaceholder: '请输入名称关键字',
      addUser: '新增用户',
      userID: '用户ID',
      name: '用户名称',
      namePlaceholder: '请输入用户名称',
      email: '用户邮箱',
      emailPlaceholder: '请输入用户邮箱',
      role: '用户级别',
      department: '所属部门',
      departmentPlaceholder: '请选择所属部门',
      phone: '联系电话',
      phonePlaceholder: '请输入联系电话',
      operate: '操作',
      password: '密码',
      passwordPlaceholder: '请输入密码',
      rePass: '确认密码',
      rePassPlaceholder: '请再次输入密码',
      submit: '确认',
      cancel: '取消',
    },
  },
}
