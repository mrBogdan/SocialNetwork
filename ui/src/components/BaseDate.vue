<template>
  <span class="text-caption grey--text" :title="fullDate">{{ localDate }}</span>
</template>

<script>
  export default {
    name: 'BaseDate',
    props: ['date'],
    data: function () {
      const dateObj = new Date(this.date);
      return {
        localDate: dateObj.toLocaleDateString(),
        fullDate: dateObj.toLocaleString(),
      }
    }
  };
</script>

<style scoped>

</style>
