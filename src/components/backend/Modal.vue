<template>
  <div class="modal" :class="{'show':openmodal}">
    <div class="modal-header df jc-sb ai-c">
      <h3 v-if="isNew">新增{{title}}</h3>
      <h3 v-else>編輯{{title}}</h3>
      <button type="button" @click="closeModal">
        <span>&times;</span>
      </button>
    </div>
    <div class="modal-body df" v-if="title==='產品'">
      <div class="modalImg">
        <h4>上傳商品圖片</h4>
        <div v-for="i in 5" :key="i + 'img'" class="form-group df fxd-c">
          <div>
            <label :for="'img' + i">輸入圖片網址</label>
            <input :id="'img' + i" v-model="tempItem.imageUrl[i - 1]" type="text"
              class="input-url" placeholder="請輸入圖片連結" />
          </div>
          <div>
            <label for="uploadimg">或 上傳圖片
              <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
            </label>
            <input id="uploadimg" ref="file" type="file" @change="uploadFile(i-1)" />
          </div>
          <img class="showImg" :src="tempItem.imageUrl[i - 1]" alt />
        </div>
      </div>
      <div class="modal-info">
        <h4>商品資訊</h4>
          <div class="form-group df fxd-c">
            <label for="title">產品名稱</label>
            <input
             id="title"
             type="text"
             v-model="tempItem.title"
             placeholder="請輸入產品名稱" />
          </div>
          <div class="form-group df fxd-c">
            <label for="category">類別</label>
            <input
             id="category"
             type="text"
             list="items"
             v-model="tempItem.category"
             required />
            <datalist name="類別" id="items">
              <option value="candle">大豆蠟燭</option>
              <option value="oil">香氛精油</option>
              <option value="diffuse">香氛擴香</option>
              <option value="jar">香氛香膏</option>
            </datalist>
          </div>
            <div class="form-group df fxd-c">
              <label for="price">原價</label>
              <input
               id="origin"
               type="number"
               v-model="tempItem.origin_price"
               placeholder="請輸入售價" />
            </div>
            <div class="form-group df fxd-c">
              <label for="price">特價</label>
              <input
               id="price"
               type="number"
               v-model="tempItem.price"
               placeholder="請輸入售價" />
            </div>
             <div class="form-group df fxd-c">
            <label for="description">產品描述</label>
            <textarea
             id="description"
             type="text"
             v-model="tempItem.description"
             placeholder="請輸入商品描述"></textarea>
          </div>
          <div class="form-group df fxd-c">
            <label for="content">注意事項</label>
            <textarea
             id="content"
             type="text"
             v-model="tempItem.content"
             placeholder="請輸入注意事項"></textarea>
          </div>
          <div class="form-group df ai-c">
                <input
                  id="is_enabled"
                  v-model="tempItem.enabled"
                  type="checkbox"
                >
                <label
                  for="is_enabled">
                  是否啟用
                </label>
              </div>
      </div>
    </div>
     <div class="modal-body" v-else-if="title==='優惠券'">
        <div>
          <label for="title">優惠券名稱</label>
          <input id="title" v-model="tempItem.title" type="text" placeholder="請輸入優惠券名稱" />
        </div>
        <div>
          <label for="coupon_code">優惠碼</label>
          <input id="coupon_code" v-model="tempItem.code" type="text" placeholder="請輸入優惠碼" />
        </div>
        <div>
          <label for="due_date">到期日</label>
          <input id="due_date" v-model="tempItem.due_date" type="date" />
        </div>
        <div>
          <label for="due_time">到期時間</label>
          <input id="due_time" v-model="tempItem.due_time" type="time" step="1" />
        </div>
        <div>
          <label for="price">折扣百分比</label>
          <input id="price" v-model="tempItem.percent" type="number" placeholder="請輸入折扣數" />
        </div>
        <div class="checkbox">
          <label for="enabled">是否啟用</label>
          <input type="checkbox" id="enabled" v-model="tempItem.enabled">
        </div>
      </div>
    <div class="modal-footer df jc-fe">
      <button
       type="button"
       @click="closeModal">
       關閉
      </button>
      <button
       type="button"
       @click="addItem"
       v-if="isNew">
       確認新增
      </button>
      <button
       type="button"
       @click="updateItem(tempItem.id)"
       v-else>
       確定更新
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'isNew', 'openmodal', 'tempItem'],
  data() {
    return {
      status: {
        fileUploading: false,
      },
      err_data: '',
    };
  },
  methods: {
    addItem() {
      this.$emit('additem');
    },
    updateItem(id) {
      this.$emit('updateitem', id);
    },
    closeModal() {
      this.$emit('closemodal');
    },
    uploadFile(index) {
      const uploadImg = this.$refs.file[index].files[0];
      const formData = new FormData();
      formData.append('file', uploadImg);
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
      }).catch((err) => {
        this.err_data = err.response.data.message;
        this.$bus.$emit('error', this.err_data);
        this.status.fileUploading = false;
      });
    },
  },
  created() {
  },
};

</script>
