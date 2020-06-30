<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-list three-line dense v-if="dialogs.count">
        <v-list-item v-for="dialog in dialogs.list" :key="dialog._id" dense link
                     :to="{ name: 'Dialog', params: { id: dialog._id } }">
          <v-list-item-content>
            <BaseDialogItem :dialog="dialog"/>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      <span v-else>Ви ще не маєте повідомлень</span>
    </v-col>
  </v-row>

</template>

<script>
  import { mapGetters } from 'vuex';
  import BaseDialogItem from '@/components/BaseDialogItem';

  export default {
    name: 'Messages',
    components: {
      BaseDialogItem,
    },
    computed: {
      ...mapGetters({
        dialogs: 'dialog/getDialogList',
      }),
    },
    created() {
      this.$store.dispatch('dialog/getAndSetDialogs');
    },
  };
</script>

<style scoped>

</style>
