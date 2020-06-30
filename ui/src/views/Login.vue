<template>
  <v-container>
    <v-row>
      <v-col></v-col>
      <v-col>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          />

          <v-text-field
            type="password"
            label="Пароль"
            :rules="passwordRules"
            v-model="password"
            required
          />

          <v-btn
            :disabled="!valid"
            color="success"
            @click="login"
            class="mr-5"
          >
            Увійти
          </v-btn>

          <v-btn
            :to="{ name: 'Register' }"
          >
            Зареєструватися
          </v-btn>

        </v-form>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>

</template>

<script>
  import AuthService from '@/services/AuthService';
  import { mapMutations } from 'vuex';
  import { AppService } from '@/services/AppService';
  import { DEFAULT_REDIRECT_PAGE } from '@/router';

  export default {
    name: 'Login',
    data: function () {
      return {
        valid: false,
        password: '',
        email: '',
        emailRules: [
          v => !!v || 'E-mail обов\'язкове',
          v => /.+@.+\..+/.test(v) || 'E-mail має бути валідним',
        ],
        passwordRules: [
          v => !!v || 'Пароль обов\'язковий',
        ],
      };
    },
    methods: {
      login() {
        this.$refs.form.validate();

        if (!this.valid) {
          return;
        }

        const authService = new AuthService();
        return authService.login(this.email, this.password)
          .then(() => {
            return location.replace('/');
          })
          .catch((err) => {
            this.showSnackbar(err.message);
            console.error({ ...err });
          });
      },
      ...mapMutations({
        showSnackbar: 'snackbar/show',
      }),
    },
  };
</script>

<style scoped>

</style>
