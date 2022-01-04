<template>
  <div class="bg-white">
    <div class="bg-white">
      <div>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 class="text-4xl font-extrabold tracking-tight text-gray-900">Products</h1>

            <div class="flex items-center">
              <button type="button" class="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden">
                <span class="sr-only">Filters</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" class="pt-6 pb-24">
            <h2 id="products-heading" class="sr-only">Products</h2>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              <!-- Filters -->
              <form class="hidden lg:block">
                <div class="border-b border-gray-200 py-6">
                  <h3 class="-my-3 flow-root">
                    <span class="font-medium text-gray-900">
                      Sort by
                    </span>
                  </h3>
                  <!-- Filter section, show/hide based on section state. -->
                  <div class="pt-6">
                    <div class="space-y-4">
                      <div class="flex items-center">
                        <input id="alphabetically" v-model="filters.sort" value="alphabetically" type="radio" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                        <label for="alphabetically" class="ml-3 text-sm text-gray-600">
                          Alphabetically
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input id="highest-price" v-model="filters.sort" value="highest-price" type="radio" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                        <label for="highest-price" class="ml-3 text-sm text-gray-600">
                          Highest price
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input id="lowest-price" v-model="filters.sort" value="lowest-price" type="radio" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
                        <label for="lowest-price" class="ml-3 text-sm text-gray-600">
                          Lowest price
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <!-- Product grid -->
              <div class="lg:col-span-3">
                <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
                  <product
                      class="w-25"
                      v-for="product in products.data"
                      :key="product.id"
                      :product="product"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import Product from '@/components/Product'

export default {
  name: 'ProductList',
  components: {Product},
  data() {
    return {
      products: {},
      filters: {
        sort: null,
      }
    }
  },
  methods: {
    /**
     * Get SDC's products.
     */
    getProducts() {
      axios.get('/products').then(({data}) => this.products = data)
    }
  },
  mounted() {
    this.getProducts()
  },
}
</script>
