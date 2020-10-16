<template>
  <div class="add">
    <el-dialog
      :title="info.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- element-ui图片上传 -->
        <el-form-item label="图片" prop="img">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="getFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { warningAlert, successAlert } from "../../../utils/alter";
import {
  reqBannerAdd,
  reqBannerDetail,
  reqBannerUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      rules: {
        img: [{ required: true, message: "请添加图片", trigger: "change" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
      },
      imgUrl: "",
      form: {
        title: "",
        img: null,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "banner/reqListAction",
    }),
    //获取文件
    getFile(e) {
      //原生
      // let file = e.target.files[0];

      // 1.大小不超过2m 1m=1024kb 1kb=1024b
      // if (file.size > 2 * 1024 * 1024) {
      //   warningAlert("文件不能超过2M");
      //   return;
      // }
      //是图片
      // let imgExtArr = [".jpg", ".png", ".jpeg", ".gif"];
      // let extname = file.name.slice(file.name.lastIndexOf("."));
      // if (!imgExtArr.some((item) => item == extname)) {
      //   warningAlert("文件格式不正确");
      //   return;
      // }
      let file = e.raw;
      //通过文件生成一个地址
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
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
      this.imgUrl = "";
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
    },
    //点击了添加按钮
    add() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          warningAlert("请输入完整");
          return;
        }

        reqBannerAdd(this.form).then((res) => {
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
        });
      });
    },
    //获取菜单详情（1条）
    look(id) {
      reqBannerDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl = this.$imgPre + this.form.img;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    update() {
      reqBannerUpdate(this.form).then((res) => {
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
<style lang="stylus" scoped>
// 原生
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}

.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}

.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

/* element-ui */
.add >>>.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>