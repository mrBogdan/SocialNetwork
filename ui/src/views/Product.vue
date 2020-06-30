<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-row>
          <v-col>
            <BaseImagePreview max-width="300" :title="product.name" :src="product.photo" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn  @click="order" color="green" class="white--text" light>Купити</v-btn>
          </v-col>
        </v-row>

      </v-col>
      <v-col>
        <v-row>
          <v-col>Назва: <span class="subtitle-1">{{ product.name }}</span></v-col>
        </v-row>
        <v-row>
          <v-col>
            <span>Категорія:</span>
            <v-chip>
              {{ product.category.name }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>Опис: <span class="subtitle-2">{{ product.description }}</span></v-col>
        </v-row>
        <v-row>
          <v-col>
            Ціна: <span class="subtitle-2">{{ product.price }} <span class="currency">{{ currency }}</span></span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AuthService from '@/services/AuthService';
  import { ORDER_CODE_STATUTES } from '@/utils/OrderStatusHelper';
  import BaseImagePreview from '@/components/BaseImagePreview';

  export default {
    name: 'Product',
    components: { BaseImagePreview },
    computed: {
      ...mapGetters({
        product: 'products/getCurrentProduct',
        currency: 'getCurrency',
      }),
      isOwner() {
        return AuthService.parseCurrentToken().id === this.product.product_owner;
      },
    },
    methods: {
      order() {
        const order = {
          total_amount: 1,
          total_price: this.product.price,
          products: [ this.product._id ],
          user: AuthService.parseCurrentToken().id,
          status: ORDER_CODE_STATUTES.IN_PROGRESS,
          product_owner: this.product.product_owner,
        };
        this.$store.dispatch('orders/orderProduct', order)
          .then(() => this.$store.dispatch('snackbar/show', 'Замовлення виконане'))
          .catch((err) => this.$store.dispatch('snackbar/error', err.message));
      },
    },
    created() {
      const id = this.$route.params.id;
      this.$store.dispatch('products/pullProductById', id);
    },
  };
</script>

<style scoped>

</style>
