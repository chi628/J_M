<template>
  <div class="login">
    <loading loader="dots" :active.sync="isLoading"></loading>
    <form class="login-form" @keyup.enter="signin()">
      <h3>管理人員登入</h3>
      <div>
        <label for="account">Account</label>
        <input
          id="account"
          type="email"
          placeholder="email"
          required
          autofocus
          v-model="user.email"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="password"
          required
          v-model="user.password"
        />
      </div>
      <button type="submit" class="login-btn" @click.prevent="signin()">Sign In</button>
      <p class="copy-mark">&copy; JS實戰班 -- Miko 2020</p>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
      isLoading: false,
      err_data: '',
    };
  },
  methods: {
    signin() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_ApiPath}/api/auth/login`;
      this.axios
        .post(api, this.user)
        .then((res) => {
          const { token } = res.data;
          const { expired } = res.data;
          document.cookie = `MikoToken = ${token}; expires = ${new Date(
            expired * 1000,
          )}; path=/`;
          this.isLoading = false;
          this.$router.push('/admin');
        })
        .catch((err) => {
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
          this.isLoading = false;
        });
    },
  },
};
</script>
