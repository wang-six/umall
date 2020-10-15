<template>
  <div>
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
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //编辑
    edit(uid) {
      this.info.isshow = true;

      this.$refs.add.look(uid);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>