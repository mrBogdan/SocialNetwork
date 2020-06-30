<template>
  <div class="comments" v-if="isShow && comments && comments.length">
    <v-divider></v-divider>
    <v-list three-line>
      <template v-for="(item, idx) in comments">
        <v-list-item dense :key="idx">

          <v-list-item-content>

             <CommentItem :comment="item" :post-id="postId" />

          </v-list-item-content>

        </v-list-item>

      </template>
    </v-list>
  </div>
</template>

<script>
  import BaseDate from '@/components/BaseDate';
  import BaseMoreMenu from '@/components/BaseMoreMenu';
  import CommentItem from '@/containers/CommentItem';

  export default {
    name: 'CommentList',
    props: ['isShow', 'comments', 'postId'],
    components: {
      CommentItem,
      BaseDate,
      BaseMoreMenu,
    },
    data: function () {
      return {}
    },
    computed: {

    },
    methods: {
      removeComment(comment) {
        return this.$store.dispatch('profilePosts/removeComment', {
          commentId: comment._id,
          postId: this.postId,
        });
      }
    }
  };
</script>

<style scoped>

</style>
