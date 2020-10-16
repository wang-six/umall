<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加活动' : '修改活动'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" prop="time">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" prop="onelist">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="twolist">
          <el-select v-model="form.second_cateid" @change="changeTwo">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" prop="threelist">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in threeCateList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
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
import {
  reqCateList,
  reqGoodsList,
  reqSeckAdd,
  reqSeckDetail,
  reqSeckUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alter";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      rules: {
        time: [
          { required: true, message: "请选择活动期限", trigger: "change" },
        ],
        onelist: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        twolist: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        threelist: [
          { required: true, message: "请选择商品", trigger: "change" },
        ],
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      value: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        title: "",
        begintime: "",
        endtime: "",
        status: 1,
      },
      //二级分类的list
      secondCateList: [],
      //三级分类的list
      threeCateList: [],
    };
  },
  computed: {
    ...mapGetters({
      //商品分类list
      cateList: "cate/list",
      goodsList: "goods/list",
      //商品规格list
      list: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      //请求商品分类list
      reqCateList: "cate/reqListAction",
      //goods list
      reqListAction: "seckill/reqListAction",
      reqGoodsList: "goods/reqListAction",
    }),

    //一级分类修改了，获取二级分类的list
    changeFirst() {
      //一级分类变了，二级分类的值应该置空
      this.form.second_cateid = "";
      this.form.goodsid = "";
      this.getSecondList();
    },
    //二级分类修改了，获取三级分类的list
    changeTwo() {
      //二级分类变了，三级分类的值应该置空
      this.form.goodsid = "";
      this.getThreeList();
    },
    //获得二级分类list
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        //二级分类list
        this.secondCateList = res.data.list;
      });
    },
    //获得三级分类list
    getThreeList() {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        //二级分类list
        this.threeCateList = res.data.list;
      });
    },

    //取消
    cancel() {
      this.info.isshow = false;
    },
    //弹框消失完成
    close() {
      //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //数据重置
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        title: "",
        begintime: "",
        endtime: "",
        status: 1,
      };
      //二级分类的list
      this.secondCateLis = [];
      //商品属性list
      this.goodsAttrList = [];
      this.value = [];
    },

    //点击了添加按钮
    add() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          warningAlert("请输入完整");
          return;
        }

        this.form.begintime = Date.parse(this.value[0]);
        this.form.endtime = Date.parse(this.value[1]);
        reqSeckAdd(this.form).then((res) => {
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
    //获取菜单详情 （1条）
    look(id) {
      //发请求
      reqSeckDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.value = [
            new Date(res.data.list.begintime * 1),
            new Date(res.data.list.endtime * 1),
          ];
          //需要请求一下二级分类的list
          this.getSecondList();
          this.getThreeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    update() {
      let data = {
        ...this.form,
      };
      reqSeckUpdate(data).then((res) => {
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
  mounted() {
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
    if (this.goodsList.length == 0) {
      this.reqGoodsList();
    }
  },
};
</script>
<style scoped>
</style>