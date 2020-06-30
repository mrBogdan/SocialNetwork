<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <v-img :class="{ 'img-on-hover': hover }" max-width="300" :src="src | concatWithAPI_URL"
             :lazy-src="src | concatWithAPI_URL" @click="open"/>
    </v-hover>

    <v-dialog v-model="dialog" max-width="720">
      <v-card>
        <v-toolbar dense flat outlined>

          <v-toolbar-title>
            {{ title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="close">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>

        </v-toolbar>
        <v-card-text>
          <v-row justify="center" align="center">
            <v-col>
              <v-img max-width="720" :src="src | concatWithAPI_URL"
                     :lazy-src="src | concatWithAPI_URL"/>
            </v-col>
          </v-row>

        </v-card-text>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'BaseImagePreview',
    props: {
      'maxWidth': String,
      'isPreview': Boolean,
      'src': String,
      'title': {
        type: String,
        default: '',
      },
    },
    data: function () {
      return {
        dialog: false,
      };
    },
    methods: {
      open() {
        this.dialog = true;
      },
      close() {
        this.dialog = false;
      },
    },
  };
</script>

<style scoped>
  .img-on-hover {
    cursor: pointer;
  }
</style>
