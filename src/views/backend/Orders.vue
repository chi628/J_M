<template>
  <div class="backend">
    <loading loader="dots" :active.sync="isLoading"></loading>
    <div class="container">
      <h3>Orders</h3>
      <table>
        <thead>
          <tr>
            <th>下單時間</th>
            <th>購買款項</th>
            <th>付款方式</th>
            <th>應付金額</th>
            <th>是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ item.created.datetime }}</td>
            <td>
              <ul>
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.quantity }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td>{{ item.payment }}</td>
            <td>{{ item.amount }}</td>
            <td>
              <input
               :id="item.id"
               type="checkbox"
               v-model="item.paid"
              @click="editPaid(item)" />
              <label :for="item.id">
                <strong v-if="item.paid">已付款</strong>
                <span v-else>尚未付款</span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

      <Pagination :page="pagination" @updatepage="getOrders" class="df jc-c"/>
  </div>
</template>
<script>
import Pagination from '@/components/fronted/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      orders: {},
      tempOrder: {},
      isLoading: false,
      pagination: {},
      err_data: '',
    };
  },
  methods: {
    getOrders(num = 1) {
      this.isLoading = true;
      this.axios
        .get(
          `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${num}`,
        )
        .then((res) => {
          this.orders = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.err_data = err.response.data.message;
          this.isLoading = false;
          this.isLoading = false;
        });
    },
    editPaid(item) {
      this.tempOrder = { ...item };
      this.tempOrder.paid = !this.tempOrder.paid;
      this.updateOrder();
    },
    updateOrder() {
      this.isLoading = true;
      let url = '';
      if (!this.tempOrder.paid) {
        url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${this.tempOrder.id}/unpaid`;
      } else {
        url = `${process.env.VUE_APP_ApiPath}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${this.tempOrder.id}/paid`;
      }
      this.axios.patch(url)
        .then(() => {
          this.isLoading = false;
          this.getOrders();
          this.tempOrder = {};
        }).catch((err) => {
          this.err_data = err.response.data.message;
          this.isLoading = false;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
