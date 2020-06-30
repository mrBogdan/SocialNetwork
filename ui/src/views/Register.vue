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
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Ім'я"
            required
          />

          <v-text-field
            v-model="last_name"
            :counter="10"
            :rules="nameRules"
            label="Призвіще"
            required
          />

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          />

          <v-text-field
            type="password"
            label="Пароль"
            v-model="password"
            required
          />

          <v-btn
            :disabled="!valid"
            color="success"
            @click="register"
            class="mr-5"
          >
            Зареєструватися
          </v-btn>

          <v-btn
            :to="{ name: 'Login' }"
          >
            Увійти
          </v-btn>

        </v-form>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AuthService from '@/services/AuthService';

  export default {
    name: 'Register',
    data: function () {
      return {
        valid: false,
        name: '',
        last_name: '',
        password: '',
        nameRules: [
          v => !!v || 'Ім\'я обов\'язкове',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail обов\'язкове',
          v => /.+@.+\..+/.test(v) || 'E-mail має бути валідним',
        ],
      };
    },
    methods: {
      register() {
        this.$refs.form.validate();

        if (!this.valid) {
          return;
        }

        const userProfile = {
          name: this.name,
          email: this.email,
          last_name: this.last_name,
          password: this.password,
        }
        const authService = new AuthService();
        return authService.register(userProfile)
          .then(() => {
            this.$router.push({ name: 'Login' });
          })
          .catch((err) => {
            this.$store.commit('snackbar/show', err.message);
            console.error(err);
          });
      }
    }
  };
</script>

<style scoped>

</style>
