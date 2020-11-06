<template>
  <div class="container">
    <AccountBread :tag="tag" />
    <div class="coupon df">
      <div class="coupon-left df jc-c ai-c">
        <p>12%</p>
      </div>
      <div class="coupon-right ta-c df fxd-c jc-c ai-c">
        <p>
          歡慶情人節，結帳輸入折扣碼「<span>iloveu</span>」，不限金額立即 88 折。
        </p>
        <p class="date">有效期限:2020.08 ~ 2020.11</p>
      </div>
    </div>
  </div>
</template>
<script>
import AccountBread from '@/components/fronted/Account_tag.vue';

export default {
  components: {
    AccountBread,
  },
  data() {
    return {
      tag: 'coupons',
    };
  },
};

</script>
