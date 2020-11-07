<template>
  <div class="delete_modal"  :class="{'show':opendelmodal}">
    <div class="delete_modal-header">
      <h1>刪除產品</h1>
      <button type="button" class="delete_modal-header-close" @click="closeDelModal">
        <span>&times;</span>
      </button>
    </div>
    <div class="delete_modal-body">
      <p> 是否刪除
      <strong>{{ tempProduct.title }}</strong> (刪除後將無法恢復)。</p>
    </div>
    <div class="delete_modal-footer">
      <button
       type="button"
       class="delete_modal-footer-close"
       @click="closeDelModal">Close</button>
      <button
       type="button"
       class="modal-footer-sure"
       @click="deleteProduct(tempProduct.id)">確認刪除</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['opendelmodal', 'tempProduct'],
  methods: {
    closeDelModal() {
      this.$emit('closedelmodal');
    },
    deleteProduct(id) {
      this.$emit('deleteproduct', id);
    },
  },
};
</script>
