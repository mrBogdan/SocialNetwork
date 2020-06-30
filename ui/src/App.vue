<template>
  <v-app>
    <Header v-if="isAuthed"></Header>
    <v-main class="pa-0">

      <v-container fluid class="fill-height">
        <v-row justify="center" no-gutters class="fill-height">
          <v-col cols="10" class="fill-height">
            <v-container class="fill-height">
              <v-row dense class="fill-height">
                <v-col v-if="isAuthed" cols="2">
                  <LeftSideMenu/>
                </v-col>
                <v-col style="height: 100%;position: relative">
                  <router-view></router-view>
                </v-col>
              </v-row>
            </v-container>

          </v-col>
        </v-row>


      </v-container>

    </v-main>
    <v-footer>
      {{ currentYear }}
    </v-footer>
    <BasePageLoader/>
    <BaseSnackbar/>
  </v-app>
</template>

<script>
  import Vue from 'vue';
  import LeftSideMenu from '@/components/LeftSideMenu.vue';
  import Header from '@/containers/Header.vue';
  import BaseSnackbar from '@/components/BaseSnackbar.vue';
  import AuthService from '@/services/AuthService';
  import { mapGetters, mapMutations } from 'vuex';
  import BasePageLoader from '@/components/BasePageLoader';
  import { AppService } from '@/services/AppService';

  export default Vue.extend({
    name: 'App',

    components: {
      BasePageLoader,
      BaseSnackbar,
      LeftSideMenu,
      Header,
    },

    data: function () {
      const dt = new Date();
      return {
        currentYear: dt.getFullYear(),
      };
    },
    computed: {
      ...mapGetters({
        isAuthed: 'isAuthed',
      }),
    },
    methods: {
      ...mapMutations({
        startLoading: 'pageLoader/startLoading',
        finishLoading: 'pageLoader/finishLoading',
      }),
    },
    created() {
      if (AuthService.isSignedIn()) {
        this.startLoading();
        const token = AuthService.getAccessToken();
        AppService.init(this.$store, token)
          .catch((err) => console.error(err))
          .finally(() => setTimeout(this.finishLoading, 100));
      }
    },
  });
</script>
