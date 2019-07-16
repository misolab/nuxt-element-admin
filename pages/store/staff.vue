<template>
  <Body>
  <span slot="title">店员管理</span>

  <div slot="action">
    <el-button-group>
      <el-button size="small" type="primary" icon="el-icon-folder">员工角色</el-button>
      <el-button size="small" type="primary" icon="el-icon-user">添加员工</el-button>
    </el-button-group>
  </div>

  <div>
    <el-table border style="width: 100%" :data="staff">
      <el-table-column align="center" prop="staff_id" label="编号" width="50"></el-table-column>
      <el-table-column align="center" prop="date" label="员工">
        <template slot-scope="scope">
          <div class="flex flex-row items-center justify-center">
            <el-avatar shape="square" :size="30" :src="scope.row.avatar"></el-avatar>
            <div class="pl-1">
              {{ scope.row.name }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="role_text" label="角色">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.role_text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status_text" label="状态">
        <template slot-scope="scope">
          <el-tag size="mini">{{ scope.row.status_text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="score_level" label="评价">
        <template slot-scope="scope">
          <el-rate disabled show-text disabled-void-color="#C0C4CC" v-model="scope.row.score_level"></el-rate>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="score_level" label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" type="primary">查看</el-button>
            <el-button size="mini" type="primary">明细</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div class="pt-4 flex justify-center">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
      </el-pagination>
    </div>
  </div>

  </Body>
</template>

<script>
  import Rate from "./../../utils/rate"

  export default {
    name: "staff",
    components: {
      // Body
    },
    data() {
      return {
        rate_texts: Rate.texts,
        staff: [
          {
            staff_id: 999,
            user_id: 111,
            name: '王大锤',
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            role_text: '员工',
            status_text: '已离职',
            score_level: 5,
          }
        ],
      }
    },
  }
</script>

<style scoped>

</style>
