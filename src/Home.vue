<template>
  <div class="home">
    <Navbar/>
    <Sidecart/>
    <Toast/>
        <router-view ></router-view>
    <div class="home_footer">
      <Footer/>
    </div>
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
  .home {
    // position: relative;
  }
  // .home_footer{
  //   position: absolute;
  //   bottom: 0;
  //   footer{
  //     position: absolute;
  //     top: 0;
  //     // bottom: 0;
  //     width: 100vw;
  //   }
  // }
</style>
