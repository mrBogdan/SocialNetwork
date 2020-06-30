<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="orders.list"
        >
          <template v-slot:item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" dark>{{ getStatus(item.status) }}</v-chip>
          </template>

          <template v-slot:item.total_price="{ item }">
            <span>{{ item.total_price }} {{ currency }}</span>
          </template>

          <template v-slot:item.products="{ item }">
            <v-list>
              <v-list-item text link :to="{ name: 'Product', params: { id: product._id } }" v-for="product in item.products" :key="product._id">
                <v-avatar>
                  <v-img :src="product.photo | concatWithAPI_URL" />
                </v-avatar>
                <span>{{ product.name }}</span>
              </v-list-item>
            </v-list>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getStatusColor, getStatus } from '@/utils/OrderStatusHelper';

  export default {
    name: 'Orders',
    data: function() {
      return {
        headers: [
          {
            text: 'Кількість',
            sortable: false,
            value: 'total_amount',
          },
          {
            text: 'Кінцева ціна',
            sortable: false,
            value: 'total_price',
          },
          {
            text: 'Придбані продукти',
            sortable: false,
            value: 'products',
          },
          {
            text: 'Дата замовлення',
            sortable: false,
            value: 'created_date',
          },
          {
            text: 'Статус',
            sortable: false,
            value: 'status'
          }
        ],
        currency: 'грн',
      }
    },
    computed: {
      ...mapGetters({
        orders: 'orders/getUserOrders',
      }),
    },
    created() {
      this.$store.dispatch('orders/pullUserOrders');
    },
    methods: {
      getStatusColor,
      getStatus,
    }
  };
</script>

<style scoped>

</style>
