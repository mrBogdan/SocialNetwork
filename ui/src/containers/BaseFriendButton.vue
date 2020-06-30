<template>
  <v-card-actions>
    <v-row align="center" justify="center">
      <v-btn v-if="isNothing" @click="sendFriendRequest" depressed color="primary">
        Додати у друзі
      </v-btn>
      <v-btn v-else-if="isSentFriendRequest" @click="sendFriendRequest" depressed disabled>
        Запит відіслано
      </v-btn>
      <v-btn v-else-if="isRequestedFriendsInYou" @click="addToFriend" depressed color="primary">
        Додати у друзі
      </v-btn>
      <v-row align="center" justify="center" v-else>
        <v-btn color="primary" class="mb-5" depressed disabled>
          У друзях
        </v-btn>
        <v-btn color="primary" @click="dialog = true" depressed>
          Написати повідомлення
        </v-btn>

      </v-row>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <v-row align="center">
              <span>{{ user.name }} {{ user.last_name }}</span>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="message" append-icon="mdi-send-circle-outline">
            </v-text-field>
          </v-card-text>
          <v-card-actions class="pa-2 flex flex-row justify-end">
                <v-btn depressed color="primary" @click="sendMessage">
                  Відправити
                </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card-actions>
</template>

<script>
  import RelationHelper from '../utils/RelationHelper';
  import { mapGetters } from 'vuex';

  export default {
    name: 'BaseFriendButton',
    data: function() {
      return {
        dialog: false,
        message: '',
      }
    },
    methods: {
      sendMessage() {
        if (!this.message) {
          return;
        }

        this.$store.dispatch('dialog/sendMessageByHttp', {
          message: this.message,
          userId: this.user._id,
        })
        .then(() => {
          this.$store.dispatch('snackbar/show', 'Повідомлення відправлено');
          this.dialog = false;
        })
        .catch((err) => this.$store.dispatch('snackbar/error', err.toString()));
      },
      sendFriendRequest() {
        const subscriber = this.$store.getters['user/getUser']._id;

        this.$store.dispatch('relations/sendFriendRequest', subscriber)
          .then(() => {
            this.$store.dispatch('snackbar/show', 'Запит на додання відправлено');
            this.$store.dispatch('relations/pullUserRelation', subscriber);
          })
          .catch((err) => this.$store.dispatch('snackbar/show', err.toString()));
      },
      addToFriend() {
        const subscriber = this.$store.getters['user/getUser']._id;

        this.$store.dispatch('relations/addToFriend', subscriber)
          .then(() => {
            this.$store.dispatch('snackbar/show', 'Додано до друзів');
            this.$store.dispatch('relations/pullUserRelation', subscriber);
          })
          .catch((err) => this.$store.dispatch('snackbar/show', err.toString()));
      },
    },
    computed: {
      ...mapGetters({
        userRelation: 'relations/getUserRelation',
        user: 'user/getUser',
      }),
      isSentFriendRequest() {
        return RelationHelper.isSentFriendRequest(this.userRelation);
      },
      isNothing() {
        return RelationHelper.isNothing(this.userRelation);
      },
      isRequestedFriendsInYou() {
        return RelationHelper.isRequestedFriendsInYou(this.userRelation);
      },
    },
  };
</script>

<style scoped>

</style>
