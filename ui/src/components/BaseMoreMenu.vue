<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, i) in moreMenuItems"
        :key="i"
        @click=""
      >
        <v-list-item-title v-if="item.isAllowed" @click="action(item.action)">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'BaseMoreMenu',
    props: ['moreMenuItems', 'entity'],
    methods: {
      action(itemAction) {
        if (this.entity) {
          return itemAction(this.entity);
        }
        return itemAction();
      }
    }
  };
</script>

<style scoped>

</style>
