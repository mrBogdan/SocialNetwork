<template>
  <v-list-item-content>
    <v-card flat outlined>
      <v-card-title>
        <v-avatar>
          <v-img :src="subscriber.avatar | concatWithAPI_URL" :lazy-src="subscriber.avatar | concatWithAPI_URL" />
        </v-avatar>
        <v-btn link text class="text-capitalize" :to="{ name: 'Profile', params: { id: subscriber._id } }">{{ subscriber.name }} {{ subscriber.last_name }}</v-btn>
      </v-card-title>
      <v-card-actions v-if="!isActionDone">
        <v-btn icon @click="acceptFriendRequest(subscriber)">
          <v-icon>
            mdi-check
          </v-icon>
        </v-btn>
        <v-btn icon @click="cancelFriendRequest(subscriber)">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-btn disabled>
          {{ actionText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-list-item-content>
</template>

<script>
  export default {
    name: 'FriendsRequestTabItem',
    props: ['subscriber'],
    data: function() {
      return {
        isActionDone: false,
        actionText: '',
      }
    },
    methods: {
      acceptFriendRequest(subscriber) {
        return this.$store.dispatch('relations/addToFriend', subscriber._id)
          .then((r) => {
            this.$store.dispatch('snackbar/show', 'Додано у друзі');
            this.$store.dispatch('friends/getAndSetNewFriendInviteCount');
            this.actionText = 'Додано у друзі';
          })
          .catch((err) => {
            console.error(err);
            this.$store.dispatch('snackbar/error');
          });
      },
      cancelFriendRequest(subscriber) {
        return this.$store.dispatch('relations/cancelFriendRequest', subscriber._id)
          .then(() => {
            this.$store.dispatch('snackbar/show', 'Запит скасовано');
            this.$store.dispatch('friends/getAndSetNewFriendInviteCount');
            this.actionText = 'Запит скасовано';
          })
          .catch((err) => {
            console.error(err);
            this.$store.dispatch('snackbar/error');
          });
      }
    }
  };
</script>

<style scoped>

</style>
