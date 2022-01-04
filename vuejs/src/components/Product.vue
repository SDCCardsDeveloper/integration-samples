<template>
  <div class="group relative">
    <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
      <img :src="background" :alt="product.name['en']" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <a href="#">
            {{ product.name['en'] }}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{ product.brand.name['en'] }}</p>
        <totp :product="product" />
      </div>
      <button type="button" @click.prevent="toggleFavorite(product)" class="text-sm font-medium text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" v-if="product.is_favorited">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-else>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import TOTP from '@/components/TOTP'

export default {
  name: 'Product',
  components: {
    Totp: TOTP
  },
  props: ['product'],
  computed: {
    /**
     * Get product first image's url.
     *
     * @returns {string}
     */
    background() {
      return this.product.background[0]?.url;
    }
  },
  methods: {
    /**
     * Toggle favorites on each product.
     *
     * @param product
     * @returns {Promise<boolean>}
     */
    toggleFavorite(product) {
      if (product.is_favorited) {
        return axios.post(`products/${product.id}/favorites`)
            .then(() => product.is_favorited = ! product.is_favorited);
      }

      return axios.delete(`products/${product.id}/unfavorites`)
          .then(() => product.is_favorited = ! product.is_favorited);
    }
  }
}
</script>