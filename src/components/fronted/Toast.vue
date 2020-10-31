<template>
    <div class="toast df jc-sb" :class="{show:show,close:close}">
        <h4>{{err}}</h4>
        <button type="button" @click="close=true,show=false">&times;</button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      err: '',
      show: false,
      close: false,
    };
  },
  created() {
    this.$bus.$on('error', (err) => {
      this.show = true;
      this.close = false;
      this.err = err;
    });
  },
  beforeDestroy() {
    this.$bus.$off('error');
  },
};
</script>
