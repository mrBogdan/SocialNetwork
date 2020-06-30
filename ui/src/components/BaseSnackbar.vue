<template>
  <v-snackbar v-model="isShow" :timeout="timeout">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="hide"
      >
        Закрити
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'BaseSnackbar',
    computed: {
      ...mapGetters({
        text: 'snackbar/getText',
        isShown: 'snackbar/isShown',
        timeout: 'snackbar/timeout'
      }),
      isShow: {
        get: function () {
          return this.isShown;
        },
        set: function (value) {
          return this.hide();
        }
      },
    },
    methods: {
      ...mapMutations({
        hide: 'snackbar/hide',
      })
    }
  };
</script>

<style scoped>

</style>
