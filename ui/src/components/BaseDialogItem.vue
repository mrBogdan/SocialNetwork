<template>
  <v-card flat color="transparent">
    <v-card-title>
      <v-row dense align="center" justify="center">
        <v-col cols="1">
          <v-avatar>
            <v-img :src="friend.avatar | concatWithAPI_URL" :lazy-src="friend.avatar | concatWithAPI_URL"></v-img>
          </v-avatar>
        </v-col>
        <v-col>
          <v-row dense>
            <v-col>
              <span class="subtitle-1" v-if="!dialog.title">
                {{ friend.name }} {{ friend.last_name }}
              </span>
              <span v-else>{{ dialog.title }}</span>
              <BaseDate :date="lastMessage.created_date" />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-caption">
              {{ lastMessage.body }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>


    </v-card-title>
    <v-card-text>

    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import BaseDate from '@/components/BaseDate';

  export default {
    name: 'BaseDialogItem',
    components: { BaseDate },
    props: [ 'dialog' ],
    computed: {
      ...mapGetters({
        accountOwner: 'account/getAccountOwner',
      }),
      friend() {
        return this.accountOwner._id === this.dialog.user1._id ? this.dialog.user2 : this.dialog.user1;
      },
      lastMessage() {
        const len = this.dialog.messages.length;
        return this.dialog.messages[len - 1];
      },
    },
  };
</script>

<style scoped>

</style>
