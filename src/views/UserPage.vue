<template>
   <main-master-page>
      <section class="user-page">
         <div class="user-page__container">
            <label>change name <input type="text" /></label>
            <label>change email <input type="email" /></label>
            <label>add phone number <input type="tel" /></label>
            <button @click="addTwoFactorAuth">Two-factor authentication</button>
            <button @click="onLogout">Log out</button>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
function onLogout() {
   localStorage.removeItem('authToken')
   router.push({ name: 'home' })
}

function addTwoFactorAuth() {}
</script>

<style lang="scss" scoped>
.user-page {
   // .user-page__container
   &__container {
      display: grid;
      gap: 20px;
      button {
         background-color: #9b5c5c;
      }
   }
}
</style>
