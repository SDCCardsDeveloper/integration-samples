<template>
  <div>
    <t-button @click.prevent="generate" type="button">
      Generate QR
    </t-button>

    <t-modal header="Title of the modal">
      <qrcode-vue v-if="totp" :value="totp"/>
      {{ totp }}

      <template v-slot:footer>
        <div class="flex justify-between">
          <t-button type="button">
            Cancel
          </t-button>
          <t-button type="button">
            Ok
          </t-button>
        </div>
      </template>
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
      time: 30
    }
  },
  methods: {
    generate() {
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
