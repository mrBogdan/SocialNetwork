<template>
  <ckeditor :editor="editor" v-model="editorData" @input="input" :config="editorConfig"></ckeditor>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import '@ckeditor/ckeditor5-build-classic/build/translations/uk';

  export default {
    name: 'BaseCKEditor',
    components: {
      ckeditor: CKEditor.component,
    },
    data: function () {
      return {
        editor: ClassicEditor,
        editorConfig: {
          language: 'uk',
          toolbar: {
            items: [
              'bold',
              'italic',
              'link',
              'undo',
              'redo'
            ]
          }
        }
      }
    },
    computed: {
      editorData: {
        get: function () {
          return this.$store.getters['getEditorText'];
        },
        set: function (value) {
          if (!value) return;

          this.$store.commit('setEditorText', value);
        }
      }
    },
    methods: {
      input() {
        this.$emit('input', this.editorData);
      }
    }
  };
</script>

<style scoped>

</style>
