<template>
  <main class="container">
    <div class="select-warp flex-row-space-between">
      <div class="flex-column-center">
        <el-button
          type="text"
          class="projectAdd"
          @click="$router.push('/project/projectEdit')"
        >
          <i class="iconfont iconxinzengxiangmu-3"></i>
          {{ $t('views.projectManage.add') }}
        </el-button>
      </div>
      <div class="flex-column-center">
        <el-input
          v-model="searchObj.name"
          :placeholder="$t('views.projectManage.searchName')"
          style="width: 462px"
          size="mini"
          @keyup.enter.native="newSelectData"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="newSelectData"
          />
        </el-input>
      </div>
    </div>
    <div class="list-warp">
      <div class="top-line flex-row-space-between" style="margin-left: 8px">
        {{ $t('views.projectManage.title') }}
      </div>
      <el-table :data="tableData" class="projectList-table" style="border: 1px">
        <el-table-column
          width="200px"
          prop="name"
          :label="$t('views.projectManage.name')"
        >
          <template slot-scope="{ row }">
            <el-tooltip
              class="item"
              effect="dark"
              :content="row.name"
              placement="top"
              :disabled="row.name.length < 24"
            >
              <div
                class="projectName"
                @click="$router.push(`/project/projectDetail/${row.id}`)"
              >
                {{ row.name }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="300px"
          style="padding-left: 20px"
          :label="$t('views.projectManage.vul')"
        >
          <template slot-scope="{ row }">
            <span
              v-for="item in row.vul_count"
              :key="item.level"
              style="margin-right: 10px"
            >
              <i
                class="iconfont iconyuandianzhong"
                style="font-size: 12px"
                :style="
                  item.level === 1
                    ? { color: '#DF6060' }
                    : item.level === 2
                    ? { color: '#F49E0B' }
                    : item.level === 3
                    ? { color: '#2F90EA' }
                    : item.level === 4
                    ? { color: '#2F90EA' }
                    : ''
                "
              ></i
              >{{ item.name }}&nbsp;&nbsp;&nbsp;{{ item.total }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="agent_count"
          width="140px"
          :label="$t('views.projectManage.agent')"
        ></el-table-column>
        <el-table-column
          prop="owner"
          :label="$t('views.projectManage.owner')"
        ></el-table-column>
        <el-table-column
          prop="latest_time"
          :label="$t('views.projectManage.time')"
        ></el-table-column>
        <el-table-column
          :label="$t('views.projectManage.manage')"
          width="100px"
        >
          <template slot-scope="{ row }">
            <i
              class="iconfont iconshezhi-2 pIcon"
              @click="$router.push(`/project/projectEdit/${row.id}`)"
            ></i>
            <i
              class="iconfont iconshanchu-6 pIcon"
              @click="projectDelete(row.id)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="pageSize"
          :current-page="page"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import VueBase from '../../VueBase'
import { Component } from 'vue-property-decorator'
import { ProjectListParams } from './types'
import { formatTimestamp } from '@/utils/utils'

@Component({ name: 'ProjectManage' })
export default class ProjectManage extends VueBase {
  private page = 1
  private pageSize = 20
  private total = 0
  private tableData: Array<ProjectListParams> = []
  private searchObj = {
    name: '',
  }

  created() {
    this.getTableData()
  }

  private newSelectData() {
    this.page = 1
    this.getTableData()
  }

  private currentChange(val: number) {
    this.page = val
    this.getTableData()
  }

  private async getTableData() {
    const params = {
      page: this.page,
      pageSize: this.pageSize,
      name: this.searchObj.name,
    }
    this.loadingStart()
    const { status, msg, data, page } = await this.services.project.projectList(
      params
    )
    this.loadingDone()
    if (status !== 201) {
      this.$message({
        type: 'error',
        message: msg,
        showClose: true,
      })
      return
    }
    this.tableData = data.reduce(
      (list: Array<ProjectListParams>, item: ProjectListParams) => {
        item.vul_count.sort((a, b) => a.level - b.level)
        list.push({
          ...item,
          latest_time: formatTimestamp(item.latest_time),
        })
        return list
      },
      []
    )
    this.total = page.alltotal
  }

  private async projectDelete(id: number) {
    const { status, msg } = await this.services.project.projectDelete({ id })
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
</script>

<style scoped lang="scss">
.select-warp {
  height: 70px;
  width: 100%;

  .projectAdd {
    height: 32px;
    padding-left: 6px;
    padding-right: 6px;
    line-height: 0;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #4a72ae;
    color: #4a72ae;
  }
}

.list-warp {
  width: 100%;
  background: #fff;
  padding: 14px;
  min-height: calc(100vh - 153px);

  .top-line {
    color: #38435a;
    font-size: 16px;
    font-weight: 600;

    img {
      width: 22px;
      height: 22px;
      cursor: pointer;
    }
  }
}
.pIcon {
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: #1a80f2;
  }
}

.projectName {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    color: #4b99f1;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
