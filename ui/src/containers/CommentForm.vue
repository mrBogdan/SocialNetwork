<template>
  <v-card flat v-if="isShow">
    <v-row>
      <v-col cols="12" class="pr-5 pl-5">
        <v-text-field
          append-icon='mdi-message'
          clear-icon="mdi-close-circle"
          clearable
          label="Коментар"
          type="text"
          v-model="value"
          @keypress.enter="sendComment"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import BaseCKEditor from '@/components/BaseCKEditor';

  export default {
    name: 'CommentForm',
    components: {
      BaseCKEditor,
    },
    props: {
      isShow: {
        type: Boolean,
        default: false,
      },
      postId: {
        type: String,
        required: true,
      }
    },
    data: function () {
      return {
        value: '',
      };
    },
    methods: {
      sendComment() {
        if (!this.value) {
          return;
        }

        return this.$store.dispatch('profilePosts/addComment', { postId: this.postId, body: this.value })
          .then(() => this.value = '');
      }
    }
  };
</script>

<style scoped>

</style>
