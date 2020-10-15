<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 表格 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //传递给add的数据
      info: {
        //添加弹框的状态
        isshow: false,
        //是添加还是编辑
        isAdd: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //添加按钮
    willAdd() {
      this.info.isshow = true;
      this.info.isAdd = true;
    },
    //编辑
    edit(id) {
      this.info.isshow = true;
      this.info.isAdd = false;

      this.$refs.add.look(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>