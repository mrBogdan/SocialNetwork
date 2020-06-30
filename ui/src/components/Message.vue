<template>
  <div class="msg-wrapper">
    <v-card class="msg" outlined :class="{ 'align-self-end': isOwner }">
      <div class="msg__information">
        <span class="msg__name">{{ message.sender.name }} {{ message.sender.last_name }}</span>
        <BaseDate :date="message.created_date" />
      </div>
      <p class="msg__text">{{message.body}}</p>
    </v-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import BaseDate from '@/components/BaseDate';

  export default {
    name: 'Message',
    components: {
      BaseDate,
    },
    props: [ 'message' ],
    computed: {
      ...mapGetters({
        accountOwner: 'account/getAccountOwner',
      }),
      isOwner() {
        return this.message.sender._id === this.accountOwner._id;
      },
    },
  };
</script>

<style lang="scss">
  .msg-wrapper {
    display: flex;
    flex-direction: column;
  }

  .msg {
    padding: 1rem;
    width: 60%;
    margin: 0 1rem;
    box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
    border-radius: 4px;
    background: #1976d2;
    color: #fff;
    position: relative;
    word-break: break-all;
    margin-bottom: 1rem;

    &__information {
      display: flex;
      justify-content: space-between;
    }

    &__name {
      font-weight: 700;
    }

    &__date {
      text-decoration: underline;
      margin-left: 15px;
    }

    &__text {
      margin-bottom: 0;
    }
  }

  .owner {
    background: white;
    border: 1px solid black;
    color: #000;
    align-self: flex-end;
  }
</style>
