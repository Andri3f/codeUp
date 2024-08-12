<template>
   <header class="header">
      <div class="header__container">
         <div class="header__logo"><img src="../../assets/img/logo.svg" alt="" /></div>
         <nav class="header__menu menu-header">
            <ul class="menu-header__list">
               <li class="menu-header__item">Educational Courses</li>
               <li class="menu-header__item">
                  <router-link :to="{ name: 'news' }">News</router-link>
               </li>
               <li class="menu-header__item">
                  <router-link :to="{ name: 'contacts' }">Contacts</router-link>
               </li>
               <li class="menu-header__item">
                  <button>Languages</button>
               </li>
            </ul>
         </nav>
         <router-link :to="{ name: 'login' }" class="header__login-btn">Login/register</router-link>
      </div>
   </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
.header {
   // .header__container
   &__container {
      display: grid;
      gap: 15px;
      align-items: center;
      grid-template-columns: auto 1fr auto;
   }
   // .header__logo
   &__logo {
      width: 43px;
      height: 43px;
      img {
         width: 100%;
      }
   }
   // .header__menu
   &__menu {
   }
   // .header__login-btn
   &__login-btn {
      background-color: #234c5c;
      border-radius: 12px;
      line-height: 1.2;
      padding: 10px 20px;
   }
}
.menu-header {
   // .menu-header__list
   &__list {
      display: flex;
      flex-wrap: wrap;
      line-height: 1.2;
      gap: 15px;
      align-items: center;
      justify-content: center;
   }
   // .menu-header__item
   &__item {
   }
}
</style>
