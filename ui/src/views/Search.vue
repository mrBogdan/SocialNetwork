<template>
  <v-row>
    <v-col>
      <v-row v-if="searchList.count">
        <v-col style="max-width: 270px" v-for="user in searchList.list" :key="user._id">
          <SearchCard :user="user" />
        </v-col>
      </v-row>
      <span v-else>Нічого не знайденно</span>
    </v-col>
  </v-row>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import SearchCard from '@/containers/SearchCard';

  export default {
    name: 'Search',
    components: { SearchCard },
    methods: {
      ...mapActions({
        search: 'search/search',
      }),
      searchDecorator() {
        const { q } = this.$route.query;

        if (!q) {
          return;
        }
        this.search(q);
      },
    },
    computed: {
      ...mapGetters({
        searchList: 'search/getSearchList',
      }),
    },
    watch: {
      '$route.query'() {
        this.searchDecorator();
      }
    },
    created() {
      this.searchDecorator();
    },
  };
</script>

<style scoped>

</style>
