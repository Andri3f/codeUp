<template>
   <div class="form-container">
      <div class="form-group">
         <input id="mail" v-model="userData.mail" type="email" class="form-input" />
         <label v-if="!userData.mail" for="mail" class="form-label">Email</label>
      </div>
      <div class="form-group">
         <input id="pass" v-model="userData.pass" type="password" class="form-input" />
         <label v-if="!userData.pass" for="pass" class="form-label">Password</label>
      </div>
      <div class="form-group">
         <input id="passConfirm" v-model="userData.passConfirm" type="password" class="form-input" />
         <label v-if="!userData.passConfirm" for="passConfirm" class="form-label">Confirm Password</label>
      </div>
      <button class="form-button" @click="loginAction">Login</button>
      <RouterLink :to="{ name: 'register' }" class="form-link">Don't have an account? Register</RouterLink>
   </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useRouter } from 'vue-router'
const usersStore = useUsersStore()
const router = useRouter()
const { onLogin } = usersStore
const userData = reactive({
   mail: '',
   pass: '',
   passConfirm: '',
})

const loginAction = async () => {
   if (userData.pass !== userData.passConfirm) {
      alert('Passwords do not match!')
      return
   }

   const { success, message } = await usersStore.onLogin(userData)
   alert(message)
   if (success) {
      router.push({ name: 'user' })
   }
}
</script>

<style lang="scss" scoped>
.form-container {
   position: relative;
   color: #f0f0f0;
   max-width: 400px;
   margin: 50px auto;
   padding: 40px;
   background-color: #2a2a2a;
   border-radius: 20px;
   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
   animation: fadeInUp 0.5s ease-out;
}

.form-container::before {
   content: '';
   position: absolute;
   top: -5px;
   left: -5px;
   right: -5px;
   bottom: -5px;
   background: linear-gradient(45deg, #161313, #ffffff, #ffffff, #000000);
   border-radius: 20px;
   filter: blur(15px);
   z-index: -1;
}

.form-group {
   position: relative;
   margin-bottom: 25px;
}

.form-input {
   width: 100%;
   padding: 12px;
   font-size: 16px;
   border: 2px solid #444;
   border-radius: 8px;
   outline: none;
   background-color: #1e1e1e;
   color: #f0f0f0;
   transition:
      border-color 0.3s,
      box-shadow 0.3s,
      background-color 0.3s;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.form-input:focus {
   border-color: #ff6f61;
   box-shadow: 0 0 15px #ff6f61;
   background-color: #2a2a2a;
}

.form-input:invalid {
   animation: shake 0.3s ease-out;
}

.form-label {
   position: absolute;
   top: 30%;
   left: 12px;
   padding: 0 8px;
   font-size: 16px;
   color: #bbb;
   transition:
      color 0.3s,
      top 0.3s,
      font-size 0.3s;
}

.form-input:focus + .form-label {
   color: #ff6f61;
   top: -14px;
   font-size: 14px;
}

.form-button {
   width: 100%;
   padding: 15px;
   font-size: 18px;
   color: #fff;
   background: linear-gradient(45deg, #ff6f61, #e65c50);
   border: none;
   border-radius: 8px;
   cursor: pointer;
   transition:
      background 0.3s,
      transform 0.3s,
      box-shadow 0.3s;
   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.form-button:hover {
   background: linear-gradient(45deg, #e65c50, #ff6f61);
   transform: translateY(-3px);
}

.form-button:active {
   transform: translateY(1px);
}

.form-link {
   display: block;
   margin-top: 20px;
   font-size: 16px;
   color: #ff6f61;
   text-align: center;
   text-decoration: none;
   transition:
      color 0.3s,
      transform 0.3s;
}

.form-link:hover {
   color: #e65c50;
   transform: scale(1.05);
}
</style>
