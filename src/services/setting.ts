import request from '@/utils/request'

interface agentListParams {
  page: number
  pageSize: number
}

export default () => new class {
  // 引擎管理-引擎列表
  agentList(params: agentListParams): Promise<iResponse> {
    return request.get('/agents', {params})
  }

  // 引擎管理-安装
  agentInstall(params: { id: number }): Promise<iResponse> {
    return request.post('/agent/install', params)
  }

  // 引擎管理-卸载
  agentUninstall(params: { id: number }): Promise<iResponse> {
    return request.post('/agent/uninstall', params)
  }

  // 策略管理-策略列表
  strategyList(): Promise<iResponse> {
    return request.get('/strategys')
  }

  // 策略管理-策略启用
  strategyEnable(id: number): Promise<iResponse> {
    return request.get(`/strategy/${id}/enable`)
  }

  // 策略管理-策略禁用
  strategyDisable(id: number): Promise<iResponse> {
    return request.get(`/strategy/${id}/disable`)
  }
}
