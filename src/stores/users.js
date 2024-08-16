import { defineStore } from 'pinia'
import axios from 'axios'
import { errorMessages } from 'vue/compiler-sfc'

export const useUsersStore = defineStore('users', () => {
   async function onRegister({ name, mail, pass }) {
      try {
         const baseURL =
            process.env.NODE_ENV === 'production' ? 'https://main--mybestcodeup.netlify.app' : 'http://localhost:3000'

         axios
         axios.defaults.baseURL = baseURL
         const response = await axios.post('http://localhost:3000/api/register', {
            name,
            email: mail,
            password: pass,
         })
         const { token, message } = response.data
         localStorage.setItem('authToken', token)

         return { success: true, message }
      } catch (error) {
         const errorMessage = error.response ? error.response.data.message : 'Registration failed: unknown error'
         return { success: false, message: errorMessage }
      }
   }
   async function onLogin({ mail, pass }) {
      try {
         const baseURL =
            process.env.NODE_ENV === 'production' ? 'https://main--mybestcodeup.netlify.app' : 'http://localhost:3000'

         axios
         axios.defaults.baseURL = baseURL
         const response = await axios.post('http://localhost:3000/api/login', {
            email: mail,
            password: pass,
         })

         const { token } = response.data
         localStorage.setItem('authToken', token)
         return { success: true, message: 'Login successful!' }
      } catch (error) {
         const errorMessage = error.response ? error.response.data.message : 'Login failed'
         return { success: false, message: errorMessage }
      }
   }
   return { onRegister, onLogin }
})
