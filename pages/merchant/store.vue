<template>
  <div>
    <script src="//map.qq.com/api/gljs?v=1.exp&key=B7TBZ-Y4DCK-L3RJG-AXGQK-7HN3S-L5BGJ" @load="jsLoaded"></script>
    <section-block title="门店列表">
      <template #action>
        <el-button type="primary" size="mini" @click="showDialog" v-if="merchant.name">添加门店</el-button>
      </template>
      <div>
        <el-table v-loading="loading" :data="stores" border style="width: 100%;">
          <el-table-column prop="id" label="编号" width="100"></el-table-column>
          <el-table-column prop="name" label="名称">
            <template slot-scope="scope">
              <el-tag slot="reference">{{ scope.row.name }}{{ scope.row.alias }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="name" label="负责人">
            <template slot-scope="scope">
              <el-tag slot="reference">{{ scope.row.principal }}</el-tag>
              <el-tag slot="reference">{{ scope.row.principal_phone }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="营业时间">
            <template slot-scope="scope">
              <el-tag slot="reference">{{ scope.row.start_time }}-{{ scope.row.end_time }}</el-tag>
            </template>
          </el-table-column>
        </el-table>

        <div class="pt-5">
          <el-pagination
              background
              layout="prev, pager, next"
              :page-size="20"
              :total="dataCount"
              @current-change="load">
          </el-pagination>
        </div>
      </div>
    </section-block>

    <el-dialog :title="`添加${merchant.name}的门店`" :visible.sync="addInput.dialogVisible" width="80vw" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-position="right" label-width="100px" :model="form" :rules="createRules" ref="createForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="门店名称" prop="name">
              <el-input v-model="form.name" placeholder="门店名称"></el-input>
            </el-form-item>

            <el-form-item label="门店地址" prop="name">
              <el-input v-model="form.address" placeholder="门店地址"></el-input>
            </el-form-item>

            <el-form-item label="门店别名" prop="alias">
              <el-input v-model="form.alias" placeholder="如: 供水站/配送站/服务点 等"></el-input>
            </el-form-item>

            <el-form-item label="门店介绍" prop="desc">
              <el-input v-model="form.desc" type="textarea" placeholder="门店介绍"></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="负责人" prop="principal">
                  <el-input v-model="form.principal" placeholder="姓名" maxlength="5"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话" prop="principal_phone">
                  <el-input v-model="form.principal_phone" placeholder="电话" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="营业时间" prop="start_time">
                  <el-time-select
                      style="width: 100%;"
                      v-model="form.start_time"
                      placeholder="选择营业时间"
                      value-format="HH:mm"
                      :picker-options="{step: '00:30', start: '00:00', end: '24:00'}"
                  ></el-time-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="打烊时间" prop="end_time">
                  <el-time-select
                      style="width: 100%;"
                      v-model="form.end_time"
                      placeholder="选择打烊时间"
                      value-format="HH:mm"
                      :picker-options="{step: '00:30', start: '00:00', end: '24:00'}"
                  ></el-time-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="门店位置" prop="location">
              <span v-show="form.location.lng">当前选择坐标为: {{ form.location.lat }},{{ form.location.lng }}</span>
              <span v-show="!form.location.lng">请通过右侧地图选择</span>
            </el-form-item>

            <el-form-item class="pt-5">
              <el-button :loading="addInput.loading" type="primary" @click="submitForm('createForm')">确 定</el-button>
              <el-button @click="addInput.dialogVisible = false">取 消</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <div style="padding: 0 0 0 20px">
              <div>
                <span>当前缩放级别: {{ mapZoom }}</span>
              </div>
              <div class="location" id="location"></div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Request from '@/utils/request'
  import Marker from '@/assets/images/marker_default.png'

  let createRules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],

    address: [
      { required: true, message: '请输入地址', trigger: 'blur' },
      { min: 2, max: 50, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],

    desc: [
      { required: true, message: '请输入描述', trigger: 'blur' },
      { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
    ],

    alias: [
      { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
    ],

    principal: [
      { required: true, message: '请输入负责人', trigger: 'blur' },
      { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
    ],

    principal_phone: [
      { required: true, message: '请输入负责人手机号', trigger: 'blur' },
      { len: 11, message: '请正确输入负责人手机号', trigger: 'blur' }
    ],

    start_time: { required: true, message: '请选择营业时间', trigger: 'blur' },

    end_time: { required: true, message: '请选择打烊时间', trigger: 'blur' },

    location: {
      type: 'object', required: true, message: '请选择地理位置', fields: {
        lat: { type: "string", required: true, message: '请选择地理位置' },
        lng: { type: "string", required: true, message: '请选择地理位置' }
      }
    }
  }

  let form = {
    name: '',
    address: '',
    desc: '',
    alias: '',
    principal: '',
    principal_phone: '',
    start_time: null,
    end_time: null,
    location: {
      lat: null,
      lng: null
    }
  }

  export default {
    name: "store",
    data() {
      return {
        createRules: createRules,
        map: null,
        mapZoom: 16,
        addInput: {
          loading: false,
          dialogVisible: false,
        },
        form: Object.assign({
          merchant_id: this.$route.query.id
        }, form),
        stores: [],
        dataCount: 0,
        loading: false,
      }
    },

    computed: {
      uploadUrl() {
        return Request.getApiUrl('upload')
      },

      uploadHeaders() {
        return {}
      },

      filterId() {
        return this.$route.query.id
      },

      merchant() {
        return {
          id: this.$route.query.id,
          name: this.$route.query.name
        }
      },
    },

    created() {
      this.load()
      this.whenVisibleDialog()
    },

    mounted() {

    },

    methods: {
      jsLoaded(e) {
        if (this.addInput.dialogVisible) {
          this.initMap()
        }
      },

      load(page) {
        this.loading = true

        Request.get('merchant_store', {
          page: page || 1,
          filter_id: this.filterId
        }).then(response => {
          this.stores = response.data.data
          this.dataCount = response.data.total
        }).finally(() => {
          this.loading = false
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addInput.loading = true
            Request.post('create_store', this.form).then(data => {
              this.addInput.dialogVisible = false
              this.form = Object.assign({}, form)
              this.$message.success('添加成功!')
            }).finally(() => {
              this.addInput.loading = false
            })
          } else {
            this.$message.error('请正确填写内容')
            return false;
          }
        });
      },

      handleAvatarSuccess(file) {
        this.form.logo = file.data
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 < 200;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 200kb!');
        }
        return isJPG && isLt2M;
      },

      whenVisibleDialog() {
        if (this.$route.query.add) {
          this.addInput.dialogVisible = true
        }
      },

      initMap() {
        if (this.initd) {
          return true
        }
        this.initd = true

        let center = new TMap.LatLng(25.092040, 104.895467)

        let map = new TMap.Map(document.getElementById('location'), {
          center: center,//设置地图中心点坐标
          zoom: 16,   //设置地图缩放级别
        })

        let markerArr = []
        let marker = new TMap.MultiMarker({
          id: 'marker-layer',
          map: map,
          styles: {
            "marker": new TMap.MarkerStyle({
              "width": 23,
              "height": 35,
              "anchor": { x: 12, y: 32 },
              "src": Marker,
            })
          },
          geometries: markerArr
        })

        map.on('zoom', evt => {
          this.mapZoom = map.getZoom()
        })

        map.on("click", (evt) => {
          let mapZoom = map.getZoom(),
            lat = evt.latLng.getLat().toFixed(6),
            lng = evt.latLng.getLng().toFixed(6)

          if (mapZoom !== 18) {
            return this.$msgbox.alert('请将缩放级别调到 18 后在选取坐标!')
          }

          this.form.location.lat = lat
          this.form.location.lng = lng

          markerArr = [
            {
              id: 'mark_icon',
              styleId: 'marker',
              position: evt.latLng,
              properties: {
                "title": "marker"
              }
            }
          ]

          marker.updateGeometries(markerArr)
        })
      },

      showDialog() {
        this.addInput.dialogVisible = true
        this.initMap()
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }

  .avatar {
    width: 140px;
    height: 140px;
    display: block;
  }

  .line {
    text-align: center;
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .location {
    width: 100%;
    height: 400px;
  }
</style>
