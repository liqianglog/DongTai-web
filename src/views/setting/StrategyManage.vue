<template>
  <div class="content-warp">
    <el-table :data="tableData" class="strategyManageTable">
      <el-table-column
        :label="$t('views.strategyManage.name')"
        prop="vul_name"
        width="160px"
      >
        <template slot-scope="{ row }">
          <div v-if="!row.isEdit" class="two-line">{{ row.vul_name }}</div>
          <el-input
            v-else
            v-model="row.vul_name"
            type="textarea"
            autosize
            resize="none"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('views.strategyManage.detail')"
        prop="vul_desc"
        min-width="300px"
      >
        <template slot-scope="{ row }">
          <div v-if="!row.isEdit">{{ row.vul_desc }}</div>
          <el-input
            v-else
            v-model="row.vul_desc"
            type="textarea"
            autosize
            resize="none"
            size="mini"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('views.strategyManage.fix')"
        prop="vul_fix"
        min-width="200px"
        align="center"
      >
        <template slot-scope="{ row }">
          <div v-if="!row.isEdit">
            {{ row.vul_fix || $t('views.strategyManage.no') }}
          </div>
          <el-input
            v-else
            v-model="row.vul_fix"
            type="textarea"
            resize="none"
            autosize
            size="mini"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column
        v-if="userInfo.role === 1 || userInfo.role === 2"
        :label="$t('views.strategyManage.status')"
        prop="state"
        width="100px"
      >
        <template slot-scope="{ row }">
          <div @click="stateChange(row.id, row.state)">
            <el-switch
              :value="row.state === 'enable'"
              active-color="#1A80F2"
              inactive-color="#C1C9D3"
            >
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="userInfo.role === 1 || userInfo.role === 2"
        :label="$t('views.strategyManage.settings')"
        width="160px"
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="!row.isEdit"
            size="small"
            class="btn"
            @click="editStart(row)"
            >{{ $t('views.strategyManage.edit') }}</el-button
          >
          <template v-else>
            <el-button size="small" class="btn" @click="editEnd(row, true)">{{
              $t('views.strategyManage.enter')
            }}</el-button>
            <el-button size="small" class="btn" @click="editEnd(row, false)">{{
              $t('views.strategyManage.clear')
            }}</el-button>
          </template>

          <el-button
            v-if="!row.isEdit"
            size="small"
            class="btn"
            @click="deleteManage(row)"
            >{{ $t('views.strategyManage.del') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import VueBase from '@/VueBase'
import { Component } from 'vue-property-decorator'
import { StrategyListObj } from '@/views/setting/types'

@Component({ name: 'StrategyManage' })
export default class StrategyManage extends VueBase {
  private tableData: Array<StrategyListObj> = []

  created() {
    this.getTableData()
  }
  get userInfo(): { username: string } {
    return this.$store.getters.userInfo
  }

  private backItem = {}
  private editStart(item: any) {
    if (this.tableData.some((i: any) => i.isEdit)) {
      this.$message({
        type: 'warning',
        message: this.$t('views.strategyManage.warning') as string,
        showClose: true,
      })
      return
    }
    this.backItem = JSON.parse(JSON.stringify(item))
    this.$set(item, 'isEdit', true)
  }

  private async deleteManage(item: any) {
    if (this.tableData.some((i: any) => i.isEdit)) {
      this.$message({
        type: 'warning',
        message: this.$t('views.strategyManage.warning') as string,
        showClose: true,
      })
      return
    }
    this.$confirm(
      this.$t('views.strategyManage.deleteWarning') as string,
      this.$t('views.strategyManage.deletePop') as string,
      {
        confirmButtonText: this.$t('views.strategyManage.enter') as string,
        cancelButtonText: this.$t('views.strategyManage.clear') as string,
        type: 'warning',
      }
    ).then(async () => {
      const { status, msg } = await this.services.setting.deleteManage(item.id)
      if (status !== 201) {
        this.$message({
          type: 'error',
          message: msg,
          showClose: true,
        })
      } else {
        this.$message({ type: 'success', message: msg, showClose: true })
        await this.getTableData()
      }
    })
  }

  private async editEnd(item: any, flag: boolean) {
    if (flag) {
      const { status, msg } = await this.services.setting.updateManage(
        item.id,
        { name: item.vul_name, vul_desc: item.vul_desc, vul_fix: item.vul_fix }
      )
      if (status !== 201) {
        this.$message({
          type: 'error',
          message: msg,
          showClose: true,
        })
      } else {
        this.$message({ type: 'success', message: msg, showClose: true })
      }
    } else {
      for (const key in item) {
        item[key] = this.backItem[key]
      }
      this.backItem = {}
    }
    this.$set(item, 'isEdit', false)
  }

  private async getTableData() {
    this.loadingStart()
    const { status, msg, data } = await this.services.setting.strategyList()
    this.loadingDone()
    if (status !== 201) {
      this.$message({
        type: 'error',
        message: msg,
        showClose: true,
      })
      return
    }
    this.tableData = data
  }

  private async stateChange(id: number, state: string) {
    if (state === 'enable') {
      this.loadingStart()
      const { status, msg } = await this.services.setting.strategyDisable(id)
      this.loadingDone()
      if (status !== 201) {
        this.$message({
          type: 'error',
          message: msg,
          showClose: true,
        })
        return
      }
      await this.getTableData()
    }
    if (state === 'disable') {
      this.loadingStart()
      const { status, msg } = await this.services.setting.strategyEnable(id)
      this.loadingDone()
      if (status !== 201) {
        this.$message({
          type: 'error',
          message: msg,
          showClose: true,
        })
        return
      }
      await this.getTableData()
    }
  }
}
</script>

<style scoped lang="scss">
.content-warp {
  padding: 38px 14px 40px 14px;
}

.install {
  cursor: pointer;
  color: #a7afb9;
}

.uninstall {
  cursor: pointer;
  color: #a7afb9;
  margin-left: 18px;
}
.btn {
  height: 28px;
  line-height: 0;
  background: #4a72ae;
  border-radius: 2px;
  color: #fff;
}
.two-line {
  letter-spacing: 0;
  width: 140px;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /*要显示的行数*/
  -webkit-box-orient: vertical;
  font-size: 12px;
}
</style>
