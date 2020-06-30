<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-card flat outlined class="mb-5">

          <BaseImagePreview max-width="auto" :title="fullName" :src="avatar"/>
          <v-divider v-if="!isTheSameUser"></v-divider>

          <BaseFriendButton v-if="!isTheSameUser"/>
        </v-card>

      </v-col>
      <v-col>
        <v-card flat outlined class="mb-5">

          <v-card-text>
            <v-row>
              <v-col>
                <v-badge
                  color="green"
                  dot
                  class="mr-5"
                >
                  <span class="subtitle-1">{{ fullName }}</span>
                </v-badge>
                <BaseVerified :is_verified="is_verified"/>
              </v-col>
            </v-row>
            <v-divider v-if="user.description"></v-divider>
            <v-row v-if="user.description">
              <v-col>
                Про себе: {{ user.description }}
              </v-col>
            </v-row>
          </v-card-text>


        </v-card>
        <PostForm/>
        <div v-if="postCount">
          <Post v-for="(post, idx) in posts" :key="idx" :post="post"></Post>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { getDefaultAvatarUrl } from '@/conts';
  import Post from '@/containers/Post.vue';
  import PostForm from '@/containers/PostForm.vue';
  import BaseUserBlock from '@/components/BaseUserBlock.vue';
  import { mapGetters } from 'vuex';
  import BaseVerified from '@/components/BaseVerified';
  import BaseFriendButton from '@/containers/BaseFriendButton';
  import { errorRedirectHandler } from '@/utils';
  import BaseImagePreview from '@/components/BaseImagePreview';

  export default {
    name: 'Profile',
    components: {
      BaseImagePreview,
      BaseVerified,
      BaseFriendButton,
      BaseUserBlock,
      PostForm,
      Post,
    },
    computed: {
      avatar: function () {
        return this.user.avatar;
      },
      fullName: function () {
        return this.user.name + ' ' + this.user.last_name;
      },
      is_verified: function () {
        return this.user.is_verified;
      },
      isTheSameUser: function () {
        return this.userId === this.$route.params.id;
      },
      ...mapGetters({
        posts: 'profilePosts/getPostList',
        postCount: 'profilePosts/getPostCount',
        userId: 'user/getAccountOwnerId',
        user: 'user/getUser',
      }),
    },
    methods: {
      init() {
        const wall = this.$route.params.id;
        return this.$store.dispatch('user/pullAndSetUserById', wall)
          .then(() => this.$store.dispatch('profilePosts/getPostList', wall))
          .then(() => this.$store.dispatch('relations/pullUserRelation', wall))
          .catch((err) => {
            this.$router.push(errorRedirectHandler(err.request.status));
          });
      },
    },
    created() {
      return this.init();
    },
    watch: {
      $route(to, from) {
        this.init();
      },
    },
  };
</script>

<style scoped>

</style>
