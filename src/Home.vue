<template>
  <div class="home">
    <Navbar/>
    <Sidecart/>
    <Toast/>
        <router-view ></router-view>
    <div class="home_footer">
      <Footer/>
    </div>
    <Gotop/>
  </div>
</template>
<script>
import Navbar from '@/components/fronted/Navbar.vue';
import Footer from '@/components/fronted/Footer.vue';
import Sidecart from '@/components/fronted/Sidecart.vue';
import Toast from '@/components/fronted/Toast.vue';
import Gotop from '@/components/fronted/Gotop.vue';

export default {
  components: {
    Navbar,
    Footer,
    Sidecart,
    Toast,
    Gotop,
  },
};
</script>
