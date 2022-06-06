import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    cartProducts: []
  },
  mutations: {
    CART(state, payload) {
      state.cartProducts = payload;
    }
  },
  actions: {
    getCartContents(context) {
      const api = `${process.env.VUE_APP_CARTAPI}/api/cart`;
      axios.get(api).then((response) => {
        context.commit('CART', response.data.products);
      });
    },
    updateItemQty(context, { id, qty }) {
      const api = `${process.env.VUE_APP_CARTAPI}/api/cart`;
      const ItemInfoAddToCart = { productId: id, quantity: qty };
      axios.post(api, ItemInfoAddToCart).then(() => {
        context.dispatch('getCartContents');
      });
    },
    addItemToCart(context, { id, qty }) {
      const api = `${process.env.VUE_APP_CARTAPI}/api/add/qty`;
      const productInfoAddedToCart = { productId: id, quantity: qty };
      axios.post(api, productInfoAddedToCart).then(() => {
        context.dispatch('alertModules/updateMessage',
          { message: '商品已加入購物車', status: 'success' }, { root: true });
        context.dispatch('getCartContents');
      });
    }
  }
});