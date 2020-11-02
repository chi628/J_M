<template>
  <footer class="footer ta-c">
    <h3>Hey,let's keep in touch!</h3>
    <div class="subscribe">
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <ValidationProvider rules="email|required_if" v-slot="{ errors }">
            <input type="email" name="電子信箱" placeholder="your email address" v-model="email" />
            <input class="submit" type="submit" :disabled="invalid" value="Subscribe" />
            <span class="errmsg">{{ errors[0] }}</span>
          </ValidationProvider>
        </form>
      </ValidationObserver>
    </div>
    <ul class="info ta-l">
      <li>
        <h4>實體店面|
        <span>地址：桃園市中壢區環中東路1巷1號</span></h4>
      </li>
      <li>
        <h4>客服專線|
        <a href="tel:+03-1234-4321">03-1234-4321</a></h4>
      </li>
      <li>
        <h4>客服信箱|
        <a href="mailto:jm@service.com.tw">jm@service.com.tw</a></h4>
      </li>
    </ul>
    <div class="copyright">
      <p>
        &copy; J&amp;M 2020 All Rights Reserved.圖片為練習使用，無商業用途。
      </p>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      email: '',
    };
  },
};
</script>
