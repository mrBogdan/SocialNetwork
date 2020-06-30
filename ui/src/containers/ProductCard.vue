<template>
  <v-card outlined hover link :to="{ name: 'Product', params: { id: product._id } }">
    <v-card-title>
      <span>{{ product.name }}</span>
    </v-card-title>
    <v-divider/>
    <v-card-text class="flex flex-column">
      <v-row dense>
        <v-col>
          <v-img max-width="150" :src="product.photo | concatWithAPI_URL" :lazy-src="product.photo | concatWithAPI_URL"/>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          {{ product.price }} {{ currency }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-chip>
            {{ product.category.name }}
          </v-chip>
        </v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ProductCard',
    props: [ 'product' ],
    computed: {
      ...mapGetters({
        currency: 'getCurrency',
      })
    }
  };
</script>

<style scoped>

</style>
