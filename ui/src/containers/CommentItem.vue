<template>
  <v-card flat outlined class="pb-5">
    <v-card-title class="flex flex-row">
      <v-avatar class="mr-5">
        <v-img :src="comment.user.avatar | concatWithAPI_URL" :lazy-src="comment.user.avatar | concatWithAPI_URL" aspect-ratio="1"></v-img>
      </v-avatar>

      <div>
        <v-row>
          <router-link class="headline black--text text-decoration-none subtitle-1" exact-active-class="none" depressed outlined text link :to="{ name: 'Profile', params: { id: comment.user._id } }">
            {{ comment.user.name }}
          </router-link>
        </v-row>
        <v-row>
          <BaseDate :date="comment.created_date" />
        </v-row>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        v-if="userId === comment.user._id"
        icon
        @click="removeComment"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="pb-0">
      {{ comment.body }}
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import BaseDate from '@/components/BaseDate.vue';

  export default {
    name: 'CommentItem',
    props: ['comment', 'postId'],
    components: {
      BaseDate,
    },
    computed: {
      ...mapGetters({
        userId: 'user/getAccountOwnerId',
      }),
    },
    methods: {
      removeComment() {
        return this.$store.dispatch('profilePosts/removeComment', {
          commentId: this.comment._id,
          postId: this.postId,
        });
      }
    }
  };
</script>

<style scoped>

</style>
