import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', () => {
   async function onRegister({ name, mail, pass }) {
      try {
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
   return { onRegister }
})
