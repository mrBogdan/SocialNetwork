<template>
  <v-row>
    <v-col>
      <v-row v-if="productList.count">
        <v-col style="max-width: 200px" v-for="product in productList.list" :key="product._id">
          <ProductCard style="max-height: 300px;" :product="product"/>
        </v-col>
      </v-row>
      <span v-else>Нічого не знайденно</span>
    </v-col>
  </v-row>

</template>

<script>
  import ProductCard from '@/containers/ProductCard';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Store',
    components: { ProductCard },
    computed: {
      ...mapGetters({
        productList: 'products/getProductList',
      }),
    },
    created() {
      this.$store.dispatch('products/pullProductList', {});
    }
  };
</script>

<style scoped>

</style>
