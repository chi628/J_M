<template>
  <div class="backend">
    <loading loader="dots" :active.sync="isLoading"></loading>
     <DelModal :title="title" :tempItem="tempData" :opendelmodal="showDelModal"
      @deleteitem="deleteData" @closedelmodal="closeDelModal" />
    <Loading :active.sync="isLoading" />
    <div class="container">
       <div class="df jc-sb ai-c">
         <h3>圖片管理</h3>
         <div class="addbtn df jc-c ai-c">
        <label class="uploadbtn">上傳圖片
          <input id="customFile" style="display:none;" type="file" @change="uploadFile">
          <i class="fa fa-photo"></i>
          <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
        </label>
      </div>
       </div>
      <table>
        <thead>
          <tr>
            <th width="50%">圖片縮圖</th>
            <th width="50%">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in storages" :key="item.id">
            <td>
              <img :src="item.path" alt />
            </td>
            <td>
              <div>
                <button type="button" @click="openModel(item)">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :page="pagination" @updatepage="getFile" class="df jc-c"/>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/fronted/Pagination.vue';
import DelModal from '@/components/backend/DelModal.vue';

export default {
  name: 'Storage',
  components: {
    Pagination,
    DelModal,
  },
  data() {
    return {
      storages: {},
      tempData: {},
      pagination: {},
      isLoading: false,
      showDelModal: false,
      status: {
        fileUploading: false,
      },
      title: '圖片',
      err_data: '',
    };
  },
  methods: {
    uploadFile() {
      this.isLoading = true;
      const uploadedfile = document.querySelector('#customFile').files[0];
      const formData = new FormData();
      formData.append('file', uploadedfile);
      this.status.fileUploading = true;
      this.axios
        .post(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/storage`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(() => {
          this.getFile();
          this.status.fileUploading = false;
          this.isLoading = false;
        })
        .catch((err) => {
          this.err_data = err.response.data.message;
          this.isLoading = false;
          this.isLoading = false;
        });
    },
    getFile(num = 1) {
      this.isLoading = true;
      this.axios
        .get(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/storage?page=${num}`,
        )
        .then((res) => {
          this.storages = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.err_data = err.response.data.message;
          this.isLoading = false;
          this.isLoading = false;
        });
    },
    deleteData() {
      this.isLoading = true;
      this.axios
        .delete(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/storage/${this.tempData.id}`,
        )
        .then(() => {
          this.getFile();
          this.showDelModal = false;
          this.isLoading = false;
        })
        .catch((err) => {
          this.err_data = err.response.data.message;
          this.isLoading = false;
          this.isLoading = false;
        });
    },
    openModel(item) {
      this.tempData = { ...item };
      this.showDelModal = true;
    },
    closeDelModal() {
      this.showDelModal = false;
    },
  },
  created() {
    this.getFile();
  },
};
</script>
