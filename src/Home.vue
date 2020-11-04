<template>
  <div>
    <Navbar/>
    <Sidecart/>
    <Toast/>
        <router-view ></router-view>
    <Footer class="footer"/>
  </div>
</template>
<script>
import Navbar from '@/components/fronted/Navbar.vue';
import Footer from '@/components/fronted/Footer.vue';
import Sidecart from '@/components/fronted/Sidecart.vue';
import Toast from '@/components/fronted/Toast.vue';

export default {
  components: {
    Navbar,
    Footer,
    Sidecart,
    Toast,
  },
};
</script>
<style lang="scss">
  // .footer{
  //   position: sticky;
  //   bottom: 0;
  //   width: 100vw;
  // }
</style>
