<template>
  <div class="chat-wrapper">
    <div>{{  }}</div>
    <div class="chat" ref="chat">
      <Message v-for="(message,index) in messages" :key="`message-${index}`" :message="message" class="flex flex-column"></Message>
    </div>
    <div class="chat__form">
      <v-text-field outlined ref="msg" label="Введіть тут своє повідомлення" @keypress.enter="send" v-model="text" append-icon="mdi-send-circle-outline"></v-text-field>
    </div>
  </div>
</template>

<script>
  import Message from '../components/Message';
  import io from 'socket.io-client';
  import { API_URL } from '@/conts';
  import { mapGetters } from 'vuex';
  import AuthService from '@/services/AuthService';

  export default {
    name: 'Dialog',
    components: {
      Message,
    },
    data: function() {
      return {
        $socket: null,
        text: '',
      }
    },
    methods: {
      send() {
        if (!this.text) {
          return;
        }
        this.$socket.emit('message', {
          token: AuthService.getAccessToken(),
          conversationId: this.$route.params.id,
          data: this.text,
        });
        this.text = '';
      }
    },
    computed: {
      ...mapGetters({
        messages: 'dialog/getCurrentMessages',
      }),
    },
    watch: {
      messages: function() {
        setTimeout(() => {
          if (this.$refs.chat) {
            this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight);
          }
        }, 0);
      },
    },
    created() {
      this.$store.dispatch('dialog/getAndSetCurrentDialog', this.$route.params.id);
      this.$nextTick(() => {
        this.$socket = io.connect(`${API_URL}`);
        this.$socket.emit('joinDialog', {
          token: AuthService.getAccessToken(),
          conversationId: this.$route.params.id,
        });
        this.$socket.on('newMessage', (message) => {
          this.$store.dispatch('dialog/pushNewMessage', { message });
        })
        this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight);
      });
    },
    beforeDestroy() {
      this.$socket.emit('leftChat', () => {
        this.clearData();
      });
      this.$socket.close();
    }
  };
</script>

<style lang="scss">
  .chat-col {
    position: relative;
  }
  .chat-wrapper {
    overflow: hidden;
    position: relative;
    height: calc(100% - 24px);
  }
  .chat {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 80px;
    overflow-y: auto;
    padding: 1rem;
  }
  .chat__form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    padding: 1rem;
  }
</style>
