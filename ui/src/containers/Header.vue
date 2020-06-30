<template>
  <v-container fluid>
    <v-row justify="center" align="center">

      <v-col cols="10">
        <v-app-bar app>
          <v-row justify="center" align="center">
            <v-col class="text-right"><router-link
              :to="{ name: 'Home' }"
              class="headline black--text text-decoration-none"
            ><v-icon>
              mdi-home
            </v-icon></router-link></v-col>
            <v-col>
              <v-text-field
                solo-inverted
                flat
                hide-details
                label="Пошук"
                v-model="searchText"
                prepend-inner-icon="mdi-magnify"
                @keypress.enter="searchRedirect"
                @click:prepend-inner="searchRedirect"
              ></v-text-field>
            </v-col>
            <v-col>

              <v-menu bottom left offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    large
                    v-on="on"
                  >
                    <v-avatar
                      size="32"
                      item
                      color="grey darken-3"
                    >
                      <v-img
                        :src="avatar | concatWithAPI_URL"
                        alt="Avatar"
                        aspect-ratio="1.7"
                      ></v-img>
                    </v-avatar>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item v-for="(el, idx) in profileMenu" :key="idx" link :to="el.to">
                    <v-list-item-icon>
                      <v-icon>{{ el.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ el.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

            </v-col>
          </v-row>

        </v-app-bar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Header',
    data: function(){
      return {
        searchText: '',
      }
    },
    methods: {
      searchRedirect() {
        if (!this.searchText) {
          return;
        }

        this.$router.push({
          name: 'Search',
          query: { q: this.searchText }
        })
      }
    },
    computed: {
      ...mapGetters({
        avatar: 'account/getAccountOwnerAvatar',
      }),
      profileMenu() {
        return [
          {
            title: 'Налаштування',
            icon: 'mdi-wrench',
            to: { name: 'Settings' }
          },
          {
            title: 'Мій магазин',
            icon: 'mdi-cog',
            to: { name: 'MyStore' },
          },
          {
            title: 'Вийти',
            icon: 'mdi-logout',
            to: { name: 'Logout' },
          },
        ]
      }
    },
  };
</script>

<style scoped>

</style>
