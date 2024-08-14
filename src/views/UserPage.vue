<template>
   <main-master-page>
      <section class="user-page">
         <div class="user-page__container">
            <h1 class="user-page__title">User Profile Settings</h1>
            <form @submit.prevent="uploadAvatar" enctype="multipart/form-data" class="user-page__form">
               <label class="user-page__label">
                  <span class="user-page__label-text">Change Name</span>
                  <input type="text" class="user-page__input" placeholder="Enter your name" />
               </label>
               <label class="user-page__label">
                  <span class="user-page__label-text">Change Email</span>
                  <input type="email" class="user-page__input" placeholder="Enter your email" />
               </label>
               <label class="user-page__label">
                  <span class="user-page__label-text">Add Phone Number</span>
                  <input type="tel" class="user-page__input" placeholder="Enter your phone number" />
               </label>

               <label class="user-page__label">
                  <span class="user-page__label-text">Change Avatar</span>
                  <input type="file" @change="onFileSelected" accept="image/*" class="user-page__file-input" />
               </label>
               <button type="submit" class="user-page__button">Upload Avatar</button>
            </form>

            <button @click="addTwoFactorAuth" class="user-page__button user-page__button--secondary">
               Two-Factor Authentication
            </button>
            <button @click="onLogout" class="user-page__button user-page__button--logout">Log Out</button>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const selectedFile = ref(null)

function onLogout() {
   localStorage.removeItem('authToken')
   router.push({ name: 'home' })
}

function addTwoFactorAuth() {}

function onFileSelected(event) {
   selectedFile.value = event.target.files[0]
}

async function uploadAvatar() {
   if (!selectedFile.value) return

   const formData = new FormData()
   formData.append('avatar', selectedFile.value)

   try {
      const response = await axios.post('/api/upload-avatar', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
         },
      })

      console.log('Avatar uploaded:', response.data)
   } catch (err) {
      console.error('Error uploading avatar:', err)
   }
}
</script>

<style lang="scss" scoped>
.user-page {
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 30px;

   &__container {
      max-width: 700px;
      width: 100%;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 30px;
      border: 1px solid #ddd;

      .user-page__title {
         font-size: 28px;
         font-weight: 700;
         color: #2c3e50;
         text-align: center;
         margin-bottom: 20px;
         border-bottom: 2px solid #3498db;
         padding-bottom: 10px;
      }

      .user-page__form {
         display: grid;
         gap: 20px;
      }

      .user-page__label {
         display: flex;
         flex-direction: column;
         font-size: 16px;
         color: #34495e;
         font-weight: 500;
         position: relative;
      }

      .user-page__label-text {
         margin-bottom: 5px;
         font-size: 16px;
         font-weight: 600;
         color: #2c3e50;
      }

      .user-page__input {
         padding: 12px 15px;
         font-size: 16px;
         border: 1px solid #ccc;
         border-radius: 8px;
         width: 100%;
         transition: border-color 0.3s;

         &:focus {
            border-color: #3498db;
            outline: none;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
         }
      }

      .user-page__file-input {
         padding: 0;
         font-size: 16px;
         color: #333;
      }

      .user-page__button {
         background-color: #3498db;
         color: white;
         padding: 12px 20px;
         border: none;
         border-radius: 8px;
         font-size: 16px;
         cursor: pointer;
         transition:
            background-color 0.3s,
            box-shadow 0.3s;
         text-transform: uppercase;

         &:hover {
            background-color: #2980b9;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
         }

         &:active {
            background-color: #1f6f9f;
         }
      }

      .user-page__button--secondary {
         background-color: #2ecc71;

         &:hover {
            background-color: #27ae60;
         }
      }

      .user-page__button--logout {
         background-color: #e74c3c;

         &:hover {
            background-color: #c0392b;
         }
      }
   }
}
</style>
