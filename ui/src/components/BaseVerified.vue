<template>
  <v-tooltip bottom v-if="is_verified">
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        v-bind="attrs"
        v-on="on"
      >mdi-shield-check</v-icon>
    </template>
    <span>Підтвердженний користувач</span>
  </v-tooltip>
</template>

<script>
  export default {
    name: 'BaseVerified',
    props: ['is_verified'],
  };
</script>

<style scoped>

</style>
