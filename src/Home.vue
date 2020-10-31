<template>
  <div>
    <Sidecart/>
    <router-view />
  </div>
</template>
<script>
import Sidecart from '@/components/fronted/Sidecart.vue';

export default {
  components: {
    Sidecart,
  },
};
</script>
<style lang="scss">
@import 'assets/scss/all.scss';
</style>
