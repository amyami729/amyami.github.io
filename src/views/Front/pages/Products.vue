<template>
  <div class="products">
    <loading :active="isLoading"></loading>
    <div class="products-header">
      <div class="products-title">
        <div class="list-icon">
          <i class="fas fa-list"></i>
          <h3>{{ currentCategory }}</h3>
        </div>
        <span>共<i class="allProducts-length">{{ displayProducts.length }}</i>件商品</span>
      </div>
      <div class="products-filter">
        <div class="search-form">
          <label for="search" class="searchLabel">
            <i class="fas fa-search"></i>
          </label>
          <input class="form-control products-search" maxlength="18" autocomplete="off" type="search" :value="search"  @input="search = $event.target.value" @keyup.enter="getProductsBySearch" placeholder="搜尋" id="search">
        </div>
        <select class="products-price" @change="updateSort">
          <option selected="true" value="0">最新上架</option>
          <option value="1">價格: 高到低</option>
          <option value="2">價格: 低到高</option>
        </select>
        <div class="search-popover" v-if="isShowSearchBar"  @click="getProductsBySearch">
          <div class="search-bar">
            <div class="shop-icon">
              <i class="fas fa-store"></i>
            </div>
              搜尋 "{{ search }}" 商品
          </div>
        </div>
      </div>
    </div>
    <div class="septalLine"></div>
    <div class="product-category">
      <button class="product-category-btn btn" @click="updateCategoryId(categoryItem)" :class="{ categoryActive : currentCategory === categoryItem }" v-for="(categoryItem, index) in allCategory" :key="index">{{ categoryItem }}</button>
    </div>
    <div class="card-wrapper" v-for="item in getProductsByPage(currentPage, displayProducts)" :key="item.id">
      <card :product="item"></card>
    </div>
    <div class="card-otherContent">
      <p v-if="displayProducts.length === 0">查無有關 "{{ search }}" 的商品</p>
    </div>
    <div class="product-pagination">
      <pagination class="pagination-inner" :paginations="pagination" @emitGetProducts="updatePagination"></pagination>
    </div>
  </div>
</template>

<script>
import card from '@/components/Front/Card.vue';
import pagination from '@/components/Pagination.vue';

export default {
  components: {
    card,
    pagination
  },
  data() {
    return {
      displayQueryParameters: {
        categoryId: '全部商品',
        sortBy: 'time',
        order: 'asc'
      },
      allProducts: [],
      displayProducts: [],
      allCategory: ['全部商品', '特色推薦', '經典設計', '木椅', '塑膠椅', '金屬椅', '沙發'],
      currentCategory: '全部商品',
      categoryId: '',
      pagination: {},
      currentPage: '',
      isLoading: false,
      search: '',
      isShowSearchBar: false
    }
  },
  methods: {
    initAllProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.allProducts = response.data.products;
        vm.displayProducts = vm.allProducts;
        vm.updatePagination();
        vm.getParameterValueOfCategoryId();
      });
    },
    getAllProducts() {
      const vm = this;
      vm.displayProducts = vm.allProducts;
      vm.currentCategory = '全部商品';
      vm.updatePagination();
    },
    updatePagination(page = 1) {
      const vm = this;
      const numberOfProductsByPage = 12;
      const totalPage = Math.ceil(vm.displayProducts.length / numberOfProductsByPage);
      vm.pagination['total_pages'] = totalPage;
      vm.currentPage = page;
      if (vm.currentPage === totalPage) {
        vm.pagination['has_next'] = false;
      }else {
        vm.pagination['has_next'] = true;
      }
      if (vm.currentPage === 1) {
        vm.pagination['has_pre'] = false;
      }else {
        vm.pagination['has_pre'] = true;
      }
      vm.pagination['current_page'] = page;
    },
    getProductsByPage(page = 1, prodcuts = []) {
      const numberOfProductsInPage = 12;
      return prodcuts.slice(page * numberOfProductsInPage - numberOfProductsInPage, page * numberOfProductsInPage);
    },
    getProductsBySearch() {
      const vm = this;
      if (vm.search) {
        this.$router.push({
          query:{
            categoryId: '全部商品',
            keyword: vm.search
          }
        });
        vm.currentCategory = '全部商品';
        vm.displayProducts = vm.allProducts.filter((item) => item.title.indexOf(vm.search) !== -1);
        vm.isShowSearchBar = false;
      }
      vm.updatePagination();
    },
    updateCategoryId(id) {
      const vm = this;
      vm.currentCategory = id;
      vm.displayQueryParameters.categoryId = id;
      vm.updateDisplayProducts();
    },
    getParameterValueOfCategoryId() {
      const vm = this;
      vm.categoryId = this.$route.query.categoryId;
      vm.updateCategoryId(vm.categoryId);
    },
    updateSort() {
      const vm = this;
      const priceOptions = document.querySelector('.products-price');
      if (priceOptions.value === "0") {
        vm.displayQueryParameters.sortBy = 'time';
        vm.displayQueryParameters.order = 'asc';
      }else if (priceOptions.value === "1") {
        vm.displayQueryParameters.sortBy = 'price';
        vm.displayQueryParameters.order = 'desc';
      }else if (priceOptions.value === "2") {
        vm.displayQueryParameters.sortBy = 'price';
        vm.displayQueryParameters.order = 'asc';
      }
      vm.updateDisplayProducts();
    },
    updateDisplayProducts() {
      const vm = this;
      this.$router.push({
        query:{
          categoryId : vm.displayQueryParameters.categoryId,
          order: vm.displayQueryParameters.order,
          sortBy: vm.displayQueryParameters.sortBy
        }
      });
      let tempProdcuts;
      if (vm.displayQueryParameters.categoryId === '全部商品') {
        tempProdcuts = [...vm.allProducts];
      }else {
        tempProdcuts = vm.allProducts.filter((product) => product.category === vm.displayQueryParameters.categoryId);
      }
      const sortBy = vm.displayQueryParameters.sortBy;
      if (sortBy === 'price') {
        tempProdcuts = tempProdcuts.sort((product1, product2) => {
          return product1.price - product2.price;
        });
      } 
      if (vm.displayQueryParameters.order === 'desc') {
        tempProdcuts = tempProdcuts.reverse();
      }
      vm.displayProducts = tempProdcuts;
      vm.updatePagination();
    }
  },
  watch: {
    search(keywords) {
      const vm = this;
      if (keywords === '') {
        this.$router.push({ query: {} });
        this.$router.push({
          query:{
            categoryId: '全部商品'
          }
        });
        vm.getAllProducts();
        vm.isShowSearchBar = false;
      }else {
        vm.isShowSearchBar = true;
      }
    }
  },
  created() {
    this.initAllProducts();
    this.getParameterValueOfCategoryId();
  }
}
</script>

<style scoped lang="scss">
@mixin Width-Height($Wsize, $Hsize) {
  width: $Wsize;
  height: $Hsize;
};

.products{
  width: 1124px;
  margin: 0 auto;

  .products-header{
    height: 75px;

    .products-title{
      float: left;
      height: 75px;
      
      .list-icon{
        float: left;

        i{
          @include Width-Height(30px, 30px);
          font-size: 20px;
          text-align: center;
          padding-top: 8px;
          color: #616161;
        }

        h3{
          display: inline-block;
          font-size: 30px;
          color: #616161;
          padding-top: 5px;
        }
      }

      span{
        float: right;
        color: #616161;
        padding-top: 12px;
        margin-left: 30px;
        font-size: 16px;
        width: 85px;

        .allProducts-length{
          color: crimson;
          font-style:normal
        }
      }
    }

    .products-filter{
      float: right;
      @include Width-Height(854px, 75px);

      .search-form{
        width: 181px;
        border: 1px solid #616161;
        margin-left: 523px;
        float: left;

        .searchLabel{
          @include Width-Height(30px, 30px);
          margin-left: 2px;
          margin-top: 8px;
          position: absolute;
        }

        i{
          padding: 7px 7px;
          font-size: 16px;
          color: #616161;
        }

        .products-search{
          height: 45px;
          padding-left: 35px;
        }

        input::placeholder{
          color: #c6c6c6;
        }
      }

      .products-price{
        float: right;
        @include Width-Height(130px, 45px);
        padding-left: 10px;
      }

      .search-popover{
        float: left;
        width: 181px;
        margin-left: 523px;
        padding-bottom: 4px;
        background: #c4c4c4;
        box-shadow: 3px 3px 9px #c4c4c4;
        cursor: pointer;

        &:hover{
          opacity: 0.8;
        }

        .search-bar{
          padding-left: 5px;
          padding-top: 6px;
          font-size: 10px;

          .shop-icon{
            display: inline-block;
            color: #fa4e32;
          }
        }
      }
    }
  }

  .septalLine{
    @include Width-Height(100%, 1px);
    background: #c4c4c4;
  }

  .product-category{
    height: 70px;

    .product-category-btn{
      margin-top: 22px;
      margin-right: 10px;
      color: #616161;
      box-shadow: none;

      &:hover{
        color: #c2987b;
      }
    }

    .categoryActive{
      color: #c2987b;
      font-weight: bold;
    }
  }

  .card-wrapper{
    margin-left: 28px;
    display: inline-block;

    &:nth-child(4n+1){
      margin-left: 0;
    }
  }

  p{
    text-align: center;
    padding-top: 35px;
    font-size: 30px;
    color: #909090;
    font-weight: bold;
  }

  .product-pagination{
    display: flex;
    justify-content: center;

    .pagination-inner{
      @include Width-Height(50%, 93px);
      display: flex;
      justify-content: center;
      padding-top: 30px;
    }
  }
}
</style> 