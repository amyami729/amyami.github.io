<template>
  <div>
    <loading :active="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-success" @click="createProduct">新增產品</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th class="d-md-table-cell d-none">分類</th>
          <th>產品圖片</th>
          <th>產品名稱</th>
          <th class="d-lg-table-cell d-none">原價</th>
          <th class="d-lg-table-cell d-none">售價</th>
          <th class="d-lg-table-cell d-none">是否啟用</th>
          <th>編輯/刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="item in products" :key="item.id">
          <td class="d-md-table-cell d-none">{{ item.category }}</td>
          <td>
            <img :src="item.imageUrl" class="thumbnail">
          </td>
          <td>{{ item.title }}</td>
          <td class="d-lg-table-cell d-none">{{ $filters.currency(item.origin_price) }}</td>
          <td class="d-sm-table-cell d-none">{{ $filters.currency(item.price) }}</td>
          <td class="d-lg-table-cell d-none">{{ item.is_enabled ? '啟用' : '未啟用' }}</td>
          <td>
            <button class="btn btn-outline-success me-2 btn-sm" @click="editProduct(item)">編輯</button>
            <button class="btn btn-outline-danger me-2 btn-sm" @click="showDeleteProductModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <productModal ref="productModal" :currentItem="currentProduct" :isNew="isNew" @emit-hide="showProductModal(false)" @emit-getProducts="getProducts">
      <template v-slot:title>{{ modalTitle }}</template>
    </productModal>
    <deleteModal ref="deleteModal" :currentItem="currentProduct" @emit-hide="showDeleteModal(false)" @deleteItem="deleteProduct">
      <template v-slot:title>{{ modalTitle }}</template>
    </deleteModal>
    <div class="product-pagination">
      <pagination class="pagination-inner" :paginations="pagination" @emitGetProducts="getProducts"></pagination>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import productModal from '@/components/Back/ProductModal.vue';
import deleteModal from '@/components/Back/DeleteModal.vue';
import pagination from '@/components/Pagination.vue';

export default {
  components: {
    productModal,
    deleteModal,
    pagination
  },
  data() {
    return {
      products: [],
      pagination: {},
      currentProduct: {},
      isNew: false,
      modalTitle: '',
      productModal: '',
      deleteModal: '',
      isLoading: false
    }
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products; 
        vm.pagination = response.data.pagination;
      });
    },
    showProductModal(isShow) {
      const vm = this;
      if (isShow) {
        vm.productModal.show();
      }else {
        vm.productModal.hide();
      }
    },
    showDeleteModal(isShow) {
      const vm = this;
      if (isShow) {
        vm.deleteModal.show();
      }else {
        vm.deleteModal.hide();
      }
    },
    createProduct() {
      const vm = this;
      vm.currentProduct = {};
      vm.showProductModal(true);
      vm.modalTitle = '新增產品';
      vm.isNew = true;
    },
    editProduct(item) {
      const vm = this;
      vm.currentProduct = Object.assign({}, item);
      vm.showProductModal(true);
      vm.modalTitle = '編輯產品';
      vm.isNew = false;
    },
    showDeleteProductModal(item) {
      const vm = this;
      vm.showDeleteModal(true);
      vm.currentProduct = item;
      vm.modalTitle = '刪除產品';
    },
    deleteProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.showDeleteModal(false);
          vm.getProducts();
        }
      });
    }
  },
  created() {     
    this.getProducts();
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal.$el);
    this.deleteModal = new Modal(this.$refs.deleteModal.$el);
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  height: 80px;
  width: 80px;
}

.product-pagination{
  display: flex;
  justify-content: center;
  margin-top: -16px;

  .pagination-inner{
    width: 50%;
    height: 93px;
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }
}
</style>