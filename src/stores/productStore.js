import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/services/axios'
import { limit } from 'firebase/firestore'

export const useProductStore = defineStore('product', () => {
  const state = reactive({
    products: [],
    error: '',
  })
  async function getProducts(category) {
    try {
      await axiosInstance.get(`products${category}`,{
        // params: {
        //   limit: 1,
        // },
      })
        .then(response => {
          state.products = response.data;
          // console.log(response.data);
        })
    } catch (error) {
      state.error = error;
    }
  }
  return { state, getProducts }
})
