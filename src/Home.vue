<template>
  <div>
    <Sidecart/>
    <Toast/>
    <router-view />
  </div>
</template>
<script>
import Sidecart from '@/components/fronted/Sidecart.vue';
import Toast from '@/components/fronted/Toast.vue';

export default {
  components: {
    Sidecart,
    Toast,
  },
};
</script>
<style lang="scss">
@import 'assets/scss/all.scss';
</style>
