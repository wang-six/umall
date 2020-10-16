<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
            @change="changepid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1" prop="icon">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else prop="url">
          <el-select v-model="form.url" placeholder="请选择地址">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRouters } from "../../../router/index";
import { warningAlert, successAlert } from "../../../utils/alter";
import {
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
        icon: [
          { required: true, message: "请选择菜单图标", trigger: "change" },
        ],
        url: [{ required: true, message: "请选择菜单地址", trigger: "change" }],
      },
      //图标
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
        "el-icon-picture-outline",
        "el-icon-s-order",
        "el-icon-s-operation",
        "el-icon-medal",
        "el-icon-location-outline",
        "el-icon-goods",
      ],
      //路由
      indexRouters: indexRouters,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "menu/reqListAction",
    }),

    // 取消
    cancel() {
      this.info.isshow = false;
    },
    //弹框消失完成
    close() {
      //添加什么也不做，编辑清空form
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //数据重置
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //点击了添加按钮
    add() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          warningAlert("请填写完整");
          return;
        }
        reqMenuAdd(this.form)
          .then((res) => {
            console.log(res);

            if (res.data.code == 200) {
              //成功
              successAlert(res.data.msg);
              //数据重置
              this.empty();
              //弹框消失
              this.cancel();
              //list数据要刷新
              this.reqListAction();
            } else {
              warningAlert(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    //修改了pid
    changepid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //获取菜单详情（1条）
    look(id) {
      // console.log("1ddsf");

      reqMenuDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    update() {
      // console.log(this.form);

      reqMenuUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>