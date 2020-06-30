<template>
  <v-overlay :value="shown" color="rgba(255,255,255,1)" opacity="1">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'BasePageLoader',
    computed: {
      ...mapGetters({
        isLoading: 'pageLoader/isLoading',
      }),
      shown: {
        get: function () {
          return this.isLoading
        },
        set: function (value) {
          return this.hide();
        }
      }
    },
    methods: {
      ...mapMutations({
        hide: 'pageLoader/finishLoading',
      })
    }
  };
</script>

<style scoped>

</style>
