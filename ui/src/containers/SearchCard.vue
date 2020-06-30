<template>
  <v-card>
    <v-card-title class="flex flex-column align-center justify-center">
      <v-btn link text :to="{ name: 'Profile', params: { id: user._id } }">{{ user.name }} {{ user.last_name }}</v-btn>
    </v-card-title>
    <v-card-text class="flex flex-column align-center justify-center">
      <v-avatar class="align-self-center" size="200">
        <v-img :src="user.avatar | concatWithAPI_URL" :lazy-src="user.avatar | concatWithAPI_URL"/>
      </v-avatar>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'SearchCard',
    props: ['user'],
  };

</script>

<style scoped>

</style>
