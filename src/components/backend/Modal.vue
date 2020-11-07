<template>
  <div class="modal" :class="{'show':openmodal}">
    <div class="modal-header">
      <div>
        <h1 v-if="isNew">新增產品</h1>
        <h1 v-else>編輯產品</h1>
      </div>
      <div class="modal-header-close">
        <button type="button" @click="closeModal">
          <span>&times;</span>
        </button>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-body-img">
        <div v-for="i in 5" :key="i + 'img'" class="form-group">
          <label :for="'img' + i">輸入圖片網址</label>
          <input
              :id="'img' + i"
              v-model="tempProduct.imageUrl[i - 1]"
              type="text"
              class="form-control"
              placeholder="請輸入圖片連結"
          />
        </div>
        <div>
          <label for="uploadimg">或 上傳圖片
              <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
          </label>
          <input
           id="uploadimg"
           ref="file"
           type="file"
           @change="uploadFile"/>
        </div>
        <div class="modal-body-img-show">
            <img :src="tempProduct.imageUrl[0]"  alt />
        </div>
      </div>
      <div class="modal-body-content">
        <div class="modal-body-content-title">
          <div>
            <label for="title">產品名稱</label>
            <input
             id="title"
             type="text"
             v-model="tempProduct.title"
             placeholder="請輸入產品名稱" />
          </div>
          <div>
            <label for="category">類別</label>
            <input
             id="category"
             type="text"
             list="items"
             v-model="tempProduct.category"
             required />
            <datalist name="類別" id="items">
              <option value="candle">大豆蠟燭</option>
              <option value="oil">香氛精油</option>
              <option value="diffuse">香氛擴香</option>
              <option value="jar">香氛香膏</option>
            </datalist>
          </div>
          <div>
            <div>
              <label for="price">售價</label>
              <input
               id="price"
               type="number"
               v-model="tempProduct.price"
               placeholder="請輸入售價" />
            </div>
          </div>
        </div>
        <div class="modal-body-describe">
          <div>
            <label for="description">產品描述</label>
            <textarea
             id="description"
             type="text"
             v-model="tempProduct.description"
             placeholder="請輸入商品描述"></textarea>
          </div>
          <div>
            <label for="content">注意事項</label>
            <textarea
             id="content"
             type="text"
             v-model="tempProduct.content"
             placeholder="請輸入注意事項"></textarea>
          </div>
          <div>
              <div>
                <input
                  id="is_enabled"
                  v-model="tempProduct.enabled"
                  type="checkbox"
                >
                <label
                  for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button
       type="button"
       class="modal-footer-close"
       @click="closeModal">
       關閉
      </button>
      <button
       type="button"
       class="modal-footer-sure"
       @click="addProduct"
       v-if="isNew">
       確認新增
      </button>
      <button
       type="button"
       class="modal-footer-sure"
       @click="updateProduct(tempProduct.id)"
       v-else>
       確定更新
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['isNew', 'openmodal', 'tempProduct'],
  data() {
    return {
      tempproduct: {
        imageUrl: [],
      },
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    addProduct() {
      this.$emit('addproduct');
    },
    updateProduct(id) {
      this.$emit('updateproduct', id);
    },
    closeModal() {
      this.$emit('closemodal');
    },
    uploadFile() {
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/storage`;
      this.status.fileUploading = true;
      this.axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        this.status.fileUploading = false;
        if (res.status === 200) {
          this.tempProduct.imageUrl.push(res.data.data.path);
        }
      }).catch(() => {
        this.status.fileUploading = false;
      });
    },
  },
};
</script>
