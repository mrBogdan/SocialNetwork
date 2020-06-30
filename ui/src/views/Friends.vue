<template>
  <v-tabs
    background-color="white"
    color="primary "
    fixed-tabs
  >
    <v-tab>Друзі</v-tab>
    <v-tab>Запити у друзі</v-tab>
    <v-tab>Мої запити</v-tab>

    <v-tab-item>

      <v-list v-if="isUserFriendsLoaded">
        <v-list-item v-for="friend in friendsList.userFriends" :key="friend._id">
          <v-list-item-content>
            <v-card outlined flat>
              <v-card-title>
                <v-avatar>
                  <v-img :src="friend.avatar | concatWithAPI_URL" :lazy-src="friend.avatar | concatWithAPI_URL"/>
                </v-avatar>
                <v-btn link text class="text-capitalize" :to="{ name: 'Profile', params: { id: friend._id } }">
                  {{ friend.name }} {{ friend.last_name }}
                </v-btn>
              </v-card-title>
            </v-card>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card v-else flat>
        <v-card-text>
          Список друзів пустий
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <FriendsRequest
        v-if="isUserFriendRequestsLoaded"
        :new-friend-requests-to-user="friendsList.newFriendRequestsToUser"/>
      <v-card v-else flat>
        <v-card-text>
          Ви не маєте нових запитів
        </v-card-text>
      </v-card>
    </v-tab-item>


    <v-tab-item>
      <v-list v-if="hasUserRequestedFriendship">
        <v-list-item v-for="friend in friendsList.userFriendRequest" :key="friend._id">
          <v-list-item-content>
            <v-card outlined flat>
              <v-card-title>
                <v-avatar>
                  <v-img :src="friend.avatar | concatWithAPI_URL" :lazy-src="friend.avatar | concatWithAPI_URL"/>
                </v-avatar>
                <v-btn link text class="text-capitalize" :to="{ name: 'Profile', params: { id: friend._id } }">
                  {{ friend.name }} {{ friend.last_name }}
                </v-btn>
              </v-card-title>
            </v-card>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card v-else flat>
        <v-card-text>
          Ви не маєте відправлених запитів
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
  import { mapGetters } from 'vuex';
  import FriendsRequest from '@/containers/FriendsTabs/FriendsRequestTab';

  export default {
    name: 'Friends',
    components: { FriendsRequest },
    data: function () {
      return {};
    },
    computed: {
      ...mapGetters({
        friendsList: 'friends/getFriends',
      }),
      isUserFriendsLoaded() {
        return this.friendsList.userFriends && this.friendsList.userFriends.length;
      },
      isUserFriendRequestsLoaded() {
        return this.friendsList.newFriendRequestsToUser && this.friendsList.newFriendRequestsToUser.length;
      },
      hasUserRequestedFriendship() {
        return this.friendsList.userFriendRequest && this.friendsList.userFriendRequest.length;
      },
    },
    created() {
      this.$store.dispatch('friends/getAndSetFriends');
    },
    methods: {},
  };
</script>

<style scoped>

</style>
