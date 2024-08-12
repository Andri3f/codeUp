<template>
   <div class="form-container">
      <div class="form-group">
         <input v-model="userData.name" type="text" id="name" class="form-input" />
         <label for="name" class="form-label">Name</label>
      </div>
      <div class="form-group">
         <input v-model="userData.mail" type="email" id="mail" class="form-input" />
         <label for="mail" class="form-label">Mail</label>
      </div>
      <div class="form-group">
         <input v-model="userData.pass" type="password" id="pass" class="form-input" />
         <label for="pass" class="form-label">Password</label>
      </div>
      <div class="form-group">
         <input v-model="userData.passConfirm" type="password" id="passConfirm" class="form-input" />
         <label for="passConfirm" class="form-label">Confirm Password</label>
      </div>
      <button @click="onRegister" class="form-button">Register</button>
      <RouterLink :to="{ name: 'login' }">Log in </RouterLink>
   </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { reactive } from 'vue'
import axios from 'axios'

const userData = reactive({
   name: '',
   mail: '',
   pass: '',
   passConfirm: '',
})

async function onRegister() {
   if (userData.pass !== userData.passConfirm) {
      alert('Passwords do not match!')
      return
   }

   try {
      const response = await axios.post('http://localhost:3000/api/register', {
         name: userData.name,
         email: userData.mail,
         password: userData.pass,
      })
      alert(response.data.message)
   } catch (error) {
      alert('Registration failed: ' + error.response.data.message)
   }
}
</script>

<style lang="scss" scoped>
.form-container {
   max-width: 400px;
   margin: 0 auto;
   padding: 20px;
   background-color: #f9f9f9;
   border-radius: 10px;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
   position: relative;
   margin-bottom: 20px;
}

.form-input {
   width: 100%;
   padding: 10px;
   font-size: 16px;
   border: 1px solid #ccc;
   border-radius: 5px;
   outline: none;
   color: black;
}

.form-input:focus {
   border-color: #007bff;
}

.form-label {
   position: absolute;
   top: -12px;
   left: 10px;
   background: #f9f9f9;
   padding: 0 5px;
   font-size: 14px;
   color: #666;
}

.form-button {
   width: 100%;
   padding: 10px;
   font-size: 16px;
   color: #fff;
   background-color: #007bff;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   transition: background-color 0.3s;
}

.form-button:hover {
   background-color: #0056b3;
}
</style>
