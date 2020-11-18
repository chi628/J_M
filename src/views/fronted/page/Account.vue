<template>
  <div class="account df">
    <div class="register df fxd-c ai-c">
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
            <input type="email" id="email" placeholder="Email address" v-model="register.email">
            <span class="errormsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <ValidationProvider rules="min:6|max:12|required" v-slot="{ errors }">
            <label for="password">密碼 Password：</label>
            <input type="password" id="password" placeholder="password(6 至 12 碼英文字母)"
              v-model="register.password">
            <span class="errormsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <label for="gender">性別</label>
            <select id="gender" name="性別" v-model="register.gender">
              <option value selected disabled>請選擇</option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">不透露</option>
            </select>
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
        <div class="agreebox">
          <label class="check_box" for="post">
            <input type="checkbox" id="post" />
            <span class="checkmark"></span>
            我同意收到電子郵報
          </label>
          <label class="check_box" for="privacy">
            <input type="checkbox" id="privacy" />
            <span class="checkmark"></span>
            我同意本站之
            <a href="javascript:;">服務條款</a> 及
            <a href="javascript:;">隱私政策</a>
          </label>
        </div>
        <button type="submit" :disabled="invalid">註冊會員</button>
      </ValidationObserver>
    </div>
    <div class="login df fxd-c ai-c">
      <h3 class="ta-c">登入會員 Login</h3>
      <ValidationObserver v-slot="{ invalid }">
        <div class="form-group">
          <ValidationProvider rules="email|required" v-slot="{ errors }">
            <label for="login_email">電子信箱 E-mail：</label>
            <input type="email" id="login_email" v-model="login.email">
            <span class="errormsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <ValidationProvider rules="min:6|max:12|required" v-slot="{ errors }">
            <label for="login_password">密碼 Password：</label>
            <input type="password" id="login_password" v-model="login.password">
            <span class="errormsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="agreebox">
          <label class="check_box" for="remember">
            <input type="checkbox" id="remember" />
            <span class="checkmark"></span>
            記住密碼
          </label>
        </div>
        <button type="submit" :disabled="invalid">登入</button>
      </ValidationObserver>
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
