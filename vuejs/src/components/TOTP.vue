<template>
  <div>
    <t-button @click.prevent="generate" type="button">
      Generate QR
    </t-button>

    <t-modal v-model="isOpen" header="Let the cashier scan this">
      <qrcode-vue :size="464" render-as="svg" v-if="totp" :value="totp"/>
    </t-modal>
  </div>
</template>

<script>
import totp from 'totp-generator'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'TOTP',
  props: ['product'],
  components: {
    QrcodeVue,
  },
  data() {
    return {
      totp: null,
      time: 30,
      isOpen: false,
    }
  },
  methods: {
    generate() {
      this.isOpen = true
      this.create()
      setInterval(this.create.bind(this), this.time * 1000)
    },

    /**
     *
     */
    create() {
      const token = totp(localStorage.getItem('app_user_secret'), {
        digits: 5,
        period: this.time,
      })

      this.totp = localStorage.getItem('app_user_id') + '.' + token

      if (this.product) {
        this.totp += '-' + this.product.products_category[0] + this.product.id
      }
    }
  }
}
</script>
