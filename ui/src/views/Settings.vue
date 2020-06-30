<template>
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
          label="Новий пароль"
          v-model="password"
          required
        />

        <v-file-input prepend-icon="mdi-camera" v-model="package" chips show-size accept="image/*" label="Аватар"/>

        <v-btn
          :disabled="!valid || uploadLoader"
          color="success"
          @click="updateProfileInfo"
          class="mr-5"
          :loading="uploadLoader"
        >
          Зберегти
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>

      </v-form>
    </v-col>
    <v-col></v-col>
  </v-row>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Settings',
    data: function() {

      return {
        valid: true,
        uploadLoader: false,
        user: {},
        package: null,
        nameRules: [
          v => !!v || 'Ім\'я обов\'язкове',
        ],
        emailRules: [
          v => !!v || 'E-mail обов\'язкове',
          v => /.+@.+\..+/.test(v) || 'E-mail має бути валідним',
        ],
      }
    },
    computed: {
      ...mapGetters({
        accountOwner: 'account/getAccountOwner',
      }),
      name: {
        get: function () {
          return this.accountOwner.name;
        },
        set: function (value) {
          this.user.name = value;
        }
      },
      last_name: {
        get: function () {
          return this.accountOwner.last_name;
        },
        set: function (value) {
          this.user.last_name = value;
        }
      },
      email: {
        get: function () {
          return this.accountOwner.email;
        },
        set: function (value) {
          this.user.email = value;
        }
      },
      password: {
        get: function () {
          return this.user.password;
        },
        set: function (value) {
          this.user.password = value;
        }
      }
    },
    methods: {
      stopBtnLoader() {
        this.uploadLoader = false
      },
      updateProfileInfo() {
        this.uploadLoader = true;
        const id = this.accountOwner._id;
        const raw = {
          fields: {
            ...this.user,
          },
        }

        if (this.package) {
          raw.file = this.package;
        }

        this.$store.dispatch('user/updateProfile', {
          id,
          raw,
        })
        .then(() => this.$store.dispatch('snackbar/show', 'Дані оновлено'))
        .catch((err) => this.$store.dispatch('snackbar/error', err.message))
        .finally(() => setTimeout(() => this.stopBtnLoader(), 100));
      }
    },
  };
</script>

<style scoped>

</style>
