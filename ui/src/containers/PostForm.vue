<template>
  <v-card outlined flat class="mb-5">
    <BaseCKEditor />
    <v-card-actions class="pa-0 pt-3">
      <v-btn color="primary" depressed @click="createPost">
        Створити
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import BaseCKEditor from '../components/BaseCKEditor';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'PostForm',
    components: {
      BaseCKEditor,
    },
    computed: {
      ...mapGetters({
        editorData: 'getEditorText'
      }),
    },
    methods: {
      ...mapMutations({
        setEditorText: 'setEditorText',
      }),
      createPost() {
        if (!this.editorData) {
          return;
        }
        return this.$store.dispatch('profilePosts/create', {
          wall: this.$route.params.id,
          body: this.editorData,
        })
          .then(() => this.setEditorText(''));
      },
    },
  };
</script>

<style scoped>

</style>
