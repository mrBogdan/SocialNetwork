<template>
  <div></div>
</template>

<script>
  import AuthService from '@/services/AuthService';

  export default {
    name: 'Logout',
    created() {
      this.$store.commit('logout');
      const authService = new AuthService();
      authService.logout();
      this.$router.push({ name: 'Login' });
    }
  };
</script>

<style scoped>

</style>
