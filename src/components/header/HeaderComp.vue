<template>
   <header ref="header" class="header">
      <div class="header__container">
         <router-link :to="{ name: 'home' }" class="header__logo">
            <img src="../../assets/img/logo.svg" alt="" />
         </router-link>
         <nav ref="menu" class="header__menu menu-header">
            <ul class="menu-header__list">
               <li ref="menuItem1" class="menu-header__item">Educational Courses</li>
               <li ref="menuItem2" class="menu-header__item">
                  <router-link :to="{ name: 'news' }">News</router-link>
               </li>
               <li ref="menuItem3" class="menu-header__item">
                  <router-link :to="{ name: 'contacts' }">Contacts</router-link>
               </li>
               <li ref="menuItem4" class="menu-header__item">
                  <button>Languages</button>
               </li>
            </ul>
         </nav>
         <router-link v-if="isUser" :to="{ name: 'user' }" class="header__user-btn">
            <img
               v-if="avatar"
               :src="isAbsoluteURL(avatar) ? avatar : '../../../' + avatar"
               alt="User Avatar"
               class="header__avatar"
            />
            <font-awesome-icon v-else :icon="['fas', 'user']" />
         </router-link>
         <router-link v-else ref="registerBtn" :to="{ name: 'register' }" class="header__login-btn button">
            Login/Register
         </router-link>
      </div>
   </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const isUser = computed(() => localStorage.getItem('authToken'))
const avatar = ref('')
const isAbsoluteURL = (url) => /^https?:\/\//.test(url)

onMounted(async () => {
   const token = isUser.value
   if (token) {
      try {
         const response = await axios.get('/api/user-profile', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         avatar.value = response.data.avatar || ''
         console.log('avatar.value')
         console.log(avatar.value)
      } catch (err) {
         console.error('Error fetching avatar:', err)
      }
   }
   window.addEventListener('avatar-updated', (event) => {
      avatar.value = event.detail.avatar
   })
})
</script>

<style lang="scss" scoped>
.header {
   position: fixed;
   z-index: 90;
   background-color: #0c0b0b;
   top: 0;
   left: 0;
   width: 100%;
   opacity: 0;
   transition: opacity 1s ease;

   &__container {
      min-height: 60px;
      display: grid;
      gap: 15px;
      align-items: center;
      grid-template-columns: auto 1fr auto;
   }

   &__logo {
      width: 43px;
      height: 43px;
      transform: translateX(-20px);
      opacity: 0;
      transition:
         transform 0.8s ease,
         opacity 0.8s ease;
      transition-delay: 0.2s;

      img {
         width: 100%;
      }
   }

   &__user-btn,
   &__login-btn {
      transform: translateY(-20px);
      opacity: 0;
      transition:
         transform 0.8s ease,
         opacity 0.8s ease;
   }

   &__user-btn {
      font-size: 20px;
      transition: all 0.4s ease;
   }

   &__login-btn {
      background-color: #234c5c;
      border-radius: 12px;
      line-height: 1.2;
      padding: 10px 20px;
      @media (any-hover: hover) {
         &:hover {
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
      transform: translateY(-20px);
      opacity: 0;
      transition:
         transform 0.8s ease,
         opacity 0.8s ease;
      transition-delay: 0.4s;
      position: relative;

      &::before {
         content: '';
         transition: height 0.3s ease;
         position: absolute;
         width: 100%;
         left: 0;
         bottom: 0;
         height: 0;
         background-color: #fff;
      }
      @media (any-hover: hover) {
         &:hover {
            &::before {
               height: 2px;
            }
         }
      }
   }
}

.loaded {
   .header {
      opacity: 1;

      &__logo {
         transform: translateX(0);
         opacity: 1;
      }

      .menu-header__item {
         transform: translateY(0);
         opacity: 1;
      }

      .menu-header__item:nth-child(1) {
         transition-delay: 0.4s;
      }
      .menu-header__item:nth-child(2) {
         transition-delay: 0.5s;
      }
      .menu-header__item:nth-child(3) {
         transition-delay: 0.6s;
      }
      .menu-header__item:nth-child(4) {
         transition-delay: 0.7s;
      }

      &__user-btn {
         transform: translateY(0);
         opacity: 1;
         transition-delay: 1s;
      }

      &__login-btn {
         transform: translateY(0);
         opacity: 1;
         transition-delay: 1.1s;
      }
   }
   .header__avatar {
      width: 43px;
      height: 43px;
      border-radius: 50%;
      object-fit: cover;
   }
}
</style>
