<template>
  <div v-cloak>
    <Navbar/>
    <Sidecart/>
    <Toast/>
    <router-view />
  </div>
</template>
<script>
import Navbar from '@/components/fronted/Navbar.vue';
import Sidecart from '@/components/fronted/Sidecart.vue';
import Toast from '@/components/fronted/Toast.vue';

export default {
  components: {
    Navbar,
    Sidecart,
    Toast,
  },
};
</script>
<style lang="scss">
@import 'assets/scss/all.scss';
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;300;400;500;600;700;900&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Satisfy&display=swap');
[v-cloak] {
  display: none;
}
</style>
