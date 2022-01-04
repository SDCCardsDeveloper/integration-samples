<template>
  <div id="app" class="container px-4 mx-auto">
    <div v-if="! isLoggedIn">
      Login...
    </div>

    <div v-else>
      <totp/>
      <product-list/>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import ProductList from '@/components/ProductList'
import TOTP from '@/components/TOTP'

export default {
  name: 'App',
  components: {
    ProductList,
    Totp: TOTP
  },
  mounted() {
    this.loginOrRegister()
  },

  data() {
    return {
      /**
       * User mock. You need to replace it with actual user object.
       * At least a phone or email are required.
       */
      currentUser: {
        name: 'Example user',
        email: 'test@example.com',
        phone: '05123456789',
      },
    }
  },
  computed: {
    /**
     * Determine that the user is logged in by checking if local storage has the user's token.
     *
     * @returns {boolean}
     */
    isLoggedIn() {
      return localStorage.getItem('app_user_token') !== null
    },
  },
  methods: {
    /**
     * To get user's token form SDC's apis.
     */
    loginOrRegister() {
      axios.post('/login', {
        email: this.currentUser.email,
        phone: this.currentUser.phone,
        name: this.currentUser.name
      }).then(({data}) => {
        localStorage.setItem('app_user_token', data.token)
        localStorage.setItem('app_user_secret', data.secret_key)
        localStorage.setItem('app_user_id', data.user_id)
      })
    },
  }
}
</script>
