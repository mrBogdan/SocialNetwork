<template>
  <div class="post mb-5">
    <v-card flat outlined>
      <v-card-title class="flex flex-row">
        <v-avatar class="mr-5">
          <v-img
            class="elevation-6"
            :src="post.user.avatar | concatWithAPI_URL"
          ></v-img>
        </v-avatar>
        <div>
          <v-row>
            <router-link class="headline black--text text-decoration-none subtitle-1" exact-active-class="none" depressed outlined text link :to="{ name: 'Profile', params: { id: post.user._id } }">
              {{ post.user.name }}
            </router-link>
          </v-row>
          <v-row>
            <BaseDate :date="post.created_date"></BaseDate>
          </v-row>
        </div>

        <v-spacer></v-spacer>

        <v-btn
          v-if="userId === post.user._id"
          icon
          @click="removePost"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pb-0" v-html="post.body" />
      <v-divider></v-divider>
      <v-card-actions>
          <v-row
            align="center"
            justify="end"
            class="pr-5"
          >
            <div class="comment-btn">
              <v-badge
                v-if="post.comments && !!post.comments.length"
                color="blue"
                overlap
                bordered
                :content="post.comments && post.comments.length"
                offset-x="18"
                offset-y="14"
              >
                <v-btn icon @click="openCommentInput">
                  <v-icon>mdi-message</v-icon>
                </v-btn>
              </v-badge>
              <v-btn v-else icon @click="openCommentInput">
                <v-icon>mdi-message</v-icon>
              </v-btn>
            </div>

            <v-btn icon>
              <v-icon class="mr-1">mdi-heart</v-icon>
            </v-btn>
            <span class="subheading mr-2">{{ post.likes.length }}</span>
          </v-row>
      </v-card-actions>

      <CommentList :is-show="isShownCommentsList" :comments="post.comments" :post-id="post._id" />
      <v-divider></v-divider>
      <CommentForm :post-id="post._id" :is-show="isShownCommentsList"/>
    </v-card>
  </div>

</template>

<script>
  import BaseDate from '@/components/BaseDate';
  import CommentForm from '@/containers/CommentForm';
  import CommentList from '@/containers/CommentList';
  import BaseMoreMenu from '@/components/BaseMoreMenu';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Post',
    props: ['post'],
    components: {
      BaseDate,
      CommentForm,
      CommentList,
      BaseMoreMenu,
    },
    computed: {
      ...mapGetters({
        userId: 'user/getAccountOwnerId',
      }),
    },
    data: function () {
      const isShownCommentsList = false;
      return {
        isShownCommentsList,
      }
    },
    methods: {
      openCommentInput() {
        this.isShownCommentsList = !this.isShownCommentsList;
      },
      removePost() {
        return this.$store.dispatch('profilePosts/removePost', this.post._id)
        .catch((err) => this.$store.commit('snackbar/show', err.message || 'Не вадалося видалити пост'));
      }
    }
  };
</script>

<style scoped>

</style>
