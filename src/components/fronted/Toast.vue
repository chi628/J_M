<template>
    <div class="toast df jc-sb">
        <h4>{{err}}</h4>
        <button type="button" class="">&times;</button>
    </div>
</template>
<script>
export default {
  data() {
    return {
      err: '',
    };
  },
  created() {
    this.$bus.$on('error', (err) => {
      this.err = err;
    });
  },
  beforeDestroy() {
    this.$bus.$off('error');
  },
};
</script>
