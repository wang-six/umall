<template>
  <div class="login">
    <div class="box">
      <div class="center text">登录</div>
      <div class="line">
        <el-input
          placeholder="请输入账号"
          v-model="form.username"
          clearable
        ></el-input>
      </div>
      <div class="line">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          clearable
          show-password
        ></el-input>
      </div>
      <div class="center line btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqLogin } from "../../utils/request";
import { successAlert, warningAlert } from "../../utils/alter";
export default {
  props: [],
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction: "changeUserInfoAction",
    }),
    login() {
      reqLogin(this.form).then((res) => {
        // console.log(res);/
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.changeUserInfoAction(res.data.list);
          // console.log(this.$store);

          this.$router.push("/");
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
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #303d60);
  position: relative;
}
.box {
  width: 400px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 18px;
}
.center {
  text-align: center;
}
.line {
  margin-top: 20px;
}
.text {
  font-size: 24px;
}
.btn button {
  width: 100%;
}
</style>