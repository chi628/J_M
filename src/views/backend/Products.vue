<template>
  <div class="backend">
    <loading loader="dots" :active.sync="isLoading"></loading>
    <Modal :title="title" :isNew="isNew" :openmodal="showModal" :tempItem="tempProduct"
      @additem="addProduct" @updateitem="updateProduct" @closemodal="closeModal" />
    <DelModal :title="title" :tempItem="tempProduct" :opendelmodal="showDelModal"
      @deleteitem="deleteProduct" @closedelmodal="closeDelModal" />
    <div class="container">
      <div class="df jc-sb ai-c">
        <h3>Products</h3>
        <button class="addbtn" type="button" @click="openModal('new')">新增產品</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Brand</th>
            <th>Image</th>
            <th>Price</th>
            <th>Enabled</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>
              <img :src="item.imageUrl[0]" alt />
            </td>
            <td>{{ item.price }}</td>
            <td>
              <label class="container">
                <input type="checkbox" v-model="item.enabled">
                <p>上架</p>
              </label>
            </td>
            <td>
              <button type="button" class="editbtn" @click="openModal('edit', item)">
                Edit
              </button>
              <button type="button" class="delbtn" @click="openModal('delete', item)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :page="pagination" @updatepage="getProducts" class="df jc-c"/>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/fronted/Pagination.vue';
import Modal from '@/components/backend/Modal.vue';
import DelModal from '@/components/backend/DelModal.vue';

export default {
  components: {
    Pagination,
    Modal,
    DelModal,
  },
  data() {
    return {
      isLoading: false,
      products: [],
      tempProduct: {
        imageUrl: [],
      },
      isNew: false,
      showModal: false,
      showDelModal: false,
      pagination: {},
      err_data: '',
      title: '產品',
    };
  },
  methods: {
    getProducts(num = 1) {
      this.isLoading = true;
      this.axios
        .get(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${num}`,
        )
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
        })
        .catch((err) => {
          this.isLoading = false;
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
        });
    },
    getProduct(id) {
      this.isLoading = true;
      this.axios
        .get(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`,
        )
        .then((res) => {
          this.isLoading = false;
          this.tempProduct = res.data.data;
        })
        .catch((err) => {
          this.isLoading = false;
          this.err_data = err.response.data.message;
          this.$bus.$emit('error', this.err_data);
        });
    },
    addProduct() {
      this.isLoading = true;
      this.axios
        .post(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/product`,
          this.tempProduct,
        )
        .then(() => {
          this.isLoading = false;
          this.getProducts();
          this.closeModal();
        })
        .catch((err) => {
          this.isLoading = false;
          this.err_data = err.response.data.message;
          this.isLoading = false;
        });
    },
    updateProduct(id) {
      this.isLoading = true;
      this.axios
        .patch(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`,
          this.tempProduct,
        )
        .then(() => {
          this.isLoading = false;
          this.getProducts();
          this.closeModal();
        })
        .catch((err) => {
          this.isLoading = false;
          this.err_data = err.response.data.message;
          this.isLoading = false;
        });
      this.tempProduct = {
        imageUrl: [],
      };
    },
    deleteProduct() {
      this.isLoading = true;
      this.axios
        .delete(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`,
        )
        .then(() => {
          this.isLoading = false;
          this.showDelModal = false;
          this.getProducts();
        })
        .catch((err) => {
          this.err_data = err.response.data.message;
          this.isLoading = false;
          this.isLoading = false;
        });

      this.tempProduct = {
        imageUrl: [],
      };
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.isNew = true;
          this.showModal = true;
          this.tempProduct = {
            imageUrl: [],
          };
          break;
        case 'edit':
          this.isNew = false;
          this.tempProduct = JSON.parse(JSON.stringify(item)); // 深層複製物件
          this.getProduct(this.tempProduct.id);
          this.showModal = true;
          break;
        case 'delete':
          this.tempProduct = {
            ...item,
          };
          this.showDelModal = true;
          break;
        default:
          break;
      }
    },
    closeModal() {
      this.showModal = false;
    },
    closeDelModal() {
      this.showDelModal = false;
    },
  },
  created() {
    this.getProducts();
  },
};

</script>
