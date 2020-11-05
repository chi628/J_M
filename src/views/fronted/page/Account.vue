<template>
  <div class="container">
    <div class="account df jc-sb">
      <div class="register">
          <h3 class="ta-c">註冊會員 Register</h3>
          <ValidationObserver v-slot="{ invalid }">
           <div class="form-group">
              <ValidationProvider rules="required" v-slot="{ errors }">
                  <label for="name">姓名 Name：</label>
                  <input type="text" id="name" v-model="register.name">
                  <span class="errormsg">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider rules="email|required" v-slot="{ errors }">
                  <label for="email">電子信箱 E-mail：</label>
                  <input type="email" placeholder="Email address" v-model="register.email">
                  <span class="errormsg">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider rules="min:6|max:12|required" v-slot="{ errors }">
                  <label for="password">密碼 Password：</label>
                  <input type="password" placeholder="password(6 至 12 碼英文字母)"
                   v-model="register.password">
                  <span class="errormsg">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider rules="required" v-slot="{ errors }">
                  <span>性別 Gender：</span>
                  <input type="checkbox" id="male" v-model="register.gender">
                  <label for="male">男</label>
                  <input type="checkbox" id="female" v-model="register.gender">
                  <label for="female">女</label>
                  <span class="errormsg">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider rules="required" v-slot="{ errors }">
                  <label for="birth">生日 Birth：</label>
                  <input type="date" id="birth" v-model="register.birth">
                  <span class="errormsg">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <button type="submit" :disabled="invalid">註冊會員</button>
      </ValidationObserver></div>
      <div class="login">
          <h3 class="ta-c">登入會員 Login</h3>
          <ValidationObserver v-slot="{ invalid }">
          <div class="form-group">
              <ValidationProvider rules="email|required" v-slot="{ errors }">
                  <label for="email">電子信箱 E-mail：</label>
                  <input type="email" v-model="login.email">
                  <span class="errormsg">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <div class="form-group">
              <ValidationProvider rules="min:6|max:12|required" v-slot="{ errors }">
                  <label for="password">密碼 Password：</label>
                  <input type="password" id="password" v-model="login.password">
                  <span class="errormsg">{{ errors[0] }}</span>
              </ValidationProvider>
          </div>
          <button type="submit" :disabled="invalid">登入</button>
      </ValidationObserver></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
        gender: '',
        birth: '',
      },
      login: {
        email: '',
        password: '',
      },
    };
  },
};
</script>
