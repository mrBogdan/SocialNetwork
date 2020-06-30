<template>
  <v-list>
    <v-list-item v-for="subscriber in newFriendRequestsToUser" :key="subscriber._id">
      <FriendsRequestTabItem :subscriber="subscriber" />
    </v-list-item>
  </v-list>
</template>

<script>
  import FriendsRequestTabItem from './FriendsRequestTabItem';
  export default {
    name: 'FriendsRequest',
    components: { FriendsRequestTabItem },
    props: ['newFriendRequestsToUser'],
  };
</script>

<style scoped>

</style>
