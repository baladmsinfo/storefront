import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

// ---------------------
// Types
// ---------------------
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId?: string;
  imageUrl?: string;
}

export interface CartItem {
  cartItemId: string;
  itemId: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  total: number;
}

export interface Pagination {
  page: number;
  take: number;
  total: number;
}

// ---------------------
// STORE
// ---------------------
export const useStore = defineStore("store", {
  state: () => ({
    products: [] as Product[],
    categories: [] as any[],
    cart: [] as CartItem[],
    cartId: null as string | null,

    pagination: {
      page: 1,
      take: 20,
      total: 0,
    } as Pagination,

    loading: false,
    error: null as string | null,
    user: null as any,
  }),

  actions: {
    /* ---------------------------------------------
     * AUTH
     * --------------------------------------------- */
    async register(data: any) {
      const { $bucksbox } = useNuxtApp();

      try {
        const res = await $bucksbox.auth.register(data);
        if (res.statusCode !== "00") throw new Error(res.message);
        return res.data;
      } catch (err: any) {
        this.error = err.message;
      }
    },

    async login(data: any) {
      const { $bucksbox } = useNuxtApp();

      try {
        const res = await $bucksbox.auth.login(data);
        if (res.statusCode !== "00") throw new Error(res.message);

        this.user = res.data;
        return res.data;
      } catch (err: any) {
        this.error = err.message;
      }
    },

    /* ---------------------------------------------
     * PRODUCT LIST
     * --------------------------------------------- */
    async fetchProducts(
      page = 1,
      take = 20,
      categoryId?: string,
      subCategoryId?: string,
      minPrice?: number,
      maxPrice?: number
    ) {
      const { $bucksbox } = useNuxtApp();

      this.loading = true;
      try {
        const res = await $bucksbox.store.products.list({
          page,
          take,
          categoryId,
          subCategoryId,
          minPrice,
          maxPrice,
        });

        if (res.statusCode !== "00") throw new Error(res.message);

        this.products = res.data;
        this.pagination = res.pagination;

        return res.data;
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },


    /* ---------------------------------------------
     * CATEGORY LIST + 10 PRODUCTS PER CATEGORY
     * --------------------------------------------- */
    async fetchCategory(page = 1, take = 20) {
      const { $bucksbox } = useNuxtApp();

      this.loading = true;

      try {
        const res = await $bucksbox.store.categories.list({ page, take });
        if (res.statusCode !== "00") throw new Error(res.message);

        // Normalize category data & limit 10 products
        this.categories = res.data.map((cat: any) => ({
          ...cat,
          children: Array.isArray(cat.children) ? cat.children : [],
          products: Array.isArray(cat.products)
            ? cat.products.slice(0, 10) // LIMIT TO 10
            : [],
        }));

        this.pagination = res.pagination;
        return this.categories;
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    /* ---------------------------------------------
     * CART INITIALIZE
     * --------------------------------------------- */
    async initializeCart(payload: any = {}) {
      const { $bucksbox } = useNuxtApp();

      this.loading = true;

      try {
        const res = await $bucksbox.store.cart.initialize(payload);
        if (res.statusCode !== "00") throw new Error(res.message);

        const cart = res.data.cart;
        this.cartId = cart.id;

        this.cart = cart.items.map((ci: any) => ({
          cartItemId: ci.id,
          itemId: ci.itemId,
          productId: ci.productId,
          name: ci.item?.product?.name,
          price: ci.price,
          qty: ci.quantity,
          total: ci.total,
        }));

        return res.data;
      } catch (err: any) {
        console.log(err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    /* ---------------------------------------------
     * GET CART
     * --------------------------------------------- */
    async getCart(cartId: string) {
      const { $bucksbox } = useNuxtApp();

      this.loading = true;

      try {
        const res = await $bucksbox.store.cart.get({ cartId });
        if (res.statusCode !== "00") throw new Error(res.message);

        const cart = res.data;
        this.cartId = cart.id;

        this.cart = cart.items.map((ci: any) => ({
          cartItemId: ci.id,
          itemId: ci.itemId,
          productId: ci.productId,
          name: ci.item?.product?.name,
          price: ci.price,
          qty: ci.quantity,
          total: ci.total,
        }));

        return res.data;
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    /* ---------------------------------------------
     * ADD TO CART
     * --------------------------------------------- */
    async addToCart(data: any) {
      const { $bucksbox } = useNuxtApp();

      this.loading = true;
      try {
        const res = await $bucksbox.store.cart.add(data);
        if (res.statusCode !== "00") throw new Error(res.message);

        const items = res.data.items;

        this.cart = items.map((ci: any) => ({
          cartItemId: ci.id,
          itemId: ci.itemId,
          productId: ci.productId,
          name: ci.item?.product?.name,
          price: ci.price,
          qty: ci.quantity,
          total: ci.total,
        }));

        return res.data;
      } catch (err: any) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    /* ---------------------------------------------
     * INCREMENT
     * --------------------------------------------- */
    async incrementItem(cartItemId: string) {
      const { $bucksbox } = useNuxtApp();

      try {
        const res = await $bucksbox.store.cart.increment({
          cartId: this.cartId,
          itemId: cartItemId,
        });

        if (res.statusCode !== "00") throw new Error(res.message);

        const item = this.cart.find((i) => i.cartItemId === cartItemId);
        if (item) {
          item.qty++;
          item.total = item.qty * item.price;
        }
      } catch (err: any) {
        this.error = err.message;
      }
    },

    /* ---------------------------------------------
     * DECREMENT
     * --------------------------------------------- */
    async decrementItem(cartItemId: string) {
      const { $bucksbox } = useNuxtApp();

      try {
        const res = await $bucksbox.store.cart.decrement({
          cartId: this.cartId,
          itemId: cartItemId,
        });

        if (res.statusCode !== "00") throw new Error(res.message);

        const item = this.cart.find((i) => i.cartItemId === cartItemId);

        if (item) {
          item.qty--;
          item.total = item.qty * item.price;

          if (item.qty <= 0) {
            this.cart = this.cart.filter((i) => i.cartItemId !== cartItemId);
          }
        }
      } catch (err: any) {
        this.error = err.message;
      }
    },

    /* ---------------------------------------------
     * DELETE CART ITEM
     * --------------------------------------------- */
    async deleteCartItem(cartItemId: string) {
      const { $bucksbox } = useNuxtApp();

      try {
        await $bucksbox.store.cart.deleteItem({
          cartId: this.cartId,
          itemId: cartItemId,
        });

        this.cart = this.cart.filter((i) => i.cartItemId !== cartItemId);
      } catch (err: any) {
        this.error = err.message;
      }
    },

    /* ---------------------------------------------
     * FINISH
     * --------------------------------------------- */
    async finishCart(cartId: string) {
      const { $bucksbox } = useNuxtApp();

      try {
        const res = await $bucksbox.store.cart.finish({ cartId });
        if (res.statusCode !== "00") throw new Error(res.message);

        this.cart = [];
        this.cartId = null;

        return res.data;
      } catch (err: any) {
        this.error = err.message;
      }
    },

    /* ---------------------------------------------
     * CHECKOUT
     * --------------------------------------------- */
    async checkout(cartId: string) {
      const { $bucksbox } = useNuxtApp();

      try {
        const res = await $bucksbox.store.checkout.process({ cartId });
        if (res.statusCode !== "00") throw new Error(res.message);

        this.cart = [];
        this.cartId = null;

        return res.data;
      } catch (err: any) {
        this.error = err.message;
      }
    },

    /* ---------------------------------------------
     * QUICK SALE
     * --------------------------------------------- */
    async quickSale(data: any) {
      const { $bucksbox } = useNuxtApp();

      try {
        const res = await $bucksbox.store.quickSale.create(data);
        if (res.statusCode !== "00") throw new Error(res.message);

        return res.data;
      } catch (err: any) {
        this.error = err.message;
      }
    },
  },
});
