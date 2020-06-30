<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" v-if="posts && posts.length">
       <Post v-for="(post, idx) in posts" :key="idx" :post="post"></Post>
      </v-col>
      <v-col v-else>
        На данний момент новин немає
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Post from '@/containers/Post';

export default {
  name: 'Home',
  components: {
    Post,
  },
  data: function () {
    return {
      posts: [],
    }
  }
};
</script>
