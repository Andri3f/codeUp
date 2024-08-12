<template>
   <header class="header" ref="header">
      <div class="header__container">
         <div class="header__logo" ref="logo">
            <img src="../../assets/img/logo.svg" alt="" />
         </div>
         <nav class="header__menu menu-header" ref="menu">
            <ul class="menu-header__list">
               <li class="menu-header__item" ref="menuItem1">Educational Courses</li>
               <li class="menu-header__item" ref="menuItem2">
                  <router-link :to="{ name: 'news' }">News</router-link>
               </li>
               <li class="menu-header__item" ref="menuItem3">
                  <router-link :to="{ name: 'contacts' }">Contacts</router-link>
               </li>
               <li class="menu-header__item" ref="menuItem4">
                  <button>Languages</button>
               </li>
            </ul>
         </nav>
         <router-link :to="{ name: 'user' }" class="header__user-but"
            ><font-awesome-icon :icon="['fas', 'user']"
         /></router-link>
         <RouterLink :to="{ name: 'register' }" class="header__login-btn" ref="registerBtn">Login/Register</RouterLink>
      </div>
   </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import 'animate.css'

const header = ref(null)
const logo = ref(null)
const menu = ref(null)
const menuItem1 = ref(null)
const menuItem2 = ref(null)
const menuItem3 = ref(null)
const menuItem4 = ref(null)
const loginBtn = ref(null)
const registerBtn = ref(null)

onMounted(() => {
   gsap.from(header.value, { opacity: 0, duration: 1 })
   gsap.from(logo.value, { opacity: 0, x: -30, duration: 1.5, delay: 0.5 })
   gsap.from(menu.value, { opacity: 0, y: -50, duration: 1.5, delay: 1 })

   gsap.from(menuItem1.value, { opacity: 0, x: -50, duration: 1, delay: 1.5 })
   gsap.from(menuItem2.value, { opacity: 0, x: -50, duration: 1, delay: 1.7 })
   gsap.from(menuItem3.value, { opacity: 0, x: -50, duration: 1, delay: 1.9 })
   gsap.from(menuItem4.value, { opacity: 0, x: -50, duration: 1, delay: 2.1 })

   gsap.to(loginBtn.value, {
      scale: 1.1,
      yoyo: true,
      repeat: -1,
      duration: 0.5,
      ease: 'power1.inOut',
   })

   gsap.to(registerBtn.value, {
      scale: 1.1,
      yoyo: true,
      repeat: -1,
      duration: 0.5,
      ease: 'power1.inOut',
   })
})
</script>

<style lang="scss" scoped>
.header {
   &__container {
      display: grid;
      gap: 15px;
      align-items: center;
      grid-template-columns: auto 1fr auto;
   }

   &__logo {
      width: 43px;
      height: 43px;
      img {
         width: 100%;
      }
   }
   &__user-but {
      font-size: 20px;
      transition: all 0.3s ease 0s;
      @media (any-hover: hover) {
         &:hover {
            opacity: 0.8;
            transform: scale(1.1);
         }
      }
   }
   &__login-btn {
      background-color: #234c5c;
      border-radius: 12px;
      line-height: 1.2;
      padding: 10px 20px;
      transition: all 0.3s ease-in-out;
      @media (any-hover: hover) {
         &:hover {
            @apply animate__animated animate__heartBeat;
            background-color: #1b3a47;
         }
      }
   }
}
.menu-header {
   &__list {
      display: flex;
      flex-wrap: wrap;
      line-height: 1.2;
      gap: 15px;
      align-items: center;
      justify-content: center;
   }

   &__item {
      transition:
         transform 0.3s ease,
         color 0.3s ease;
      position: relative;
      &::before {
         content: '';
         transition: height 0.2s ease 0s;
         position: absolute;
         width: 100%;
         left: 0;
         bottom: 0;
         height: 0;
         background-color: #fff;
      }
      &:hover {
         @apply animate__animated animate__bounceIn;
         &::before {
            height: 2px;
         }
      }
   }
}
</style>
