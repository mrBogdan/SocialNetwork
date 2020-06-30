<template>
  <v-navigation-drawer :expand-on-hover="false">
    <v-list dense nav class="py-0">
      <v-list-item v-for="(el, index) in menuItems" :key="index" link :to="el.to">
        <v-list-item-icon>
          <v-badge
            v-if="el.badge && el.badge.value"
            color="primary"
            offset-x="8"
            offset-y="12"
            :content="el.badge.value"
          >
            <v-icon>{{ el.icon }}</v-icon>
          </v-badge>
          <v-icon v-else>{{ el.icon }}</v-icon>

        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ el.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'LeftSideMenu',
    computed: {
      ...mapGetters({
        userId: 'account/getAccountOwnerId',
        friendRequestCount: 'friends/getCountNewFriends',
      }),
      menuItems: function () {
        return [
          {
            title: 'Моя сторінка',
            icon: 'mdi-account',
            to: { name: 'Profile', params: { id: this.userId } }
          },
          {
            title: 'Мої повідомлення',
            icon: 'mdi-email',
            to: { name: 'Messages' },
          },
          {
            title: 'Мої друзі',
            icon: 'mdi-account-multiple',
            to: { name: 'Friends' },
            badge: {
              value: this.friendRequestCount,
            }
          },
          {
            title: 'Магазин',
            icon: 'mdi-cart',
            to: { name: 'Store' }
          },
          {
            title: 'Мої замовлення',
            icon: 'mdi-clipboard-list',
            to: { name: 'Orders' }
          },
        ];
      }
    }
  };
</script>

<style scoped>

</style>
