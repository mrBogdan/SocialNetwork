<template>
  <v-card flat outlined>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-actions class="flex flex-wrap align-center justify-center">
      <div v-for="idx in amount" :key="idx" class="flex flex-column">
        <v-avatar>
          <v-img :src="users[idx].avatar" aspect-ratio="1"></v-img>
        </v-avatar>

        <div>
          {{ users[idx].name }}
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'BaseUserBlock',
    props: {
      users: {
        type: Array,
        default: [],
      },
      title: {
        type: String,
        default: '',
      },
      limit: {
        type: Number,
        default: 12,
      }
    },
    data: function () {
      let amount = this.limit;
      if (this.users && this.users.length < this.limit) {
        amount = this.users.length - 1;
      }
      if (!this.users.length) {
        amount = 0;
      }
      return {
        amount,
      }
    }
  };
</script>

<style scoped>

</style>
