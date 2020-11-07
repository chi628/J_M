<template>
  <div class="login">
    <loading loader="dots" :active.sync="isLoading"></loading>
    <form class="login-form" @keyup.enter="signin()">
      <h1>Login</h1>
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
    };
  },
  methods: {
    signin() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_ApiPath}/api/auth/login`;
      this.axios
        .post(api, this.user)
        .then((res) => {
          this.isLoading = false;
          const { token } = res.data;
          const { expired } = res.data;
          document.cookie = `MikoToken = ${token}; expires = ${new Date(
            expired * 1000,
          )}; path=/`;
          this.$router.push('/admin');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
