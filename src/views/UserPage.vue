<template>
   <main-master-page>
      <section class="user-page">
         <div class="user-page__container">
            <h1 class="user-page__title">User Profile Settings</h1>
            <form enctype="multipart/form-data" class="user-page__form" @submit.prevent="updateProfile">
               <label class="user-page__label">
                  <span class="user-page__label-text">Change Name</span>
                  <input v-model="name" type="text" class="user-page__input" placeholder="Enter your name" />
               </label>

               <label class="user-page__label">
                  <span class="user-page__label-text">Change Email</span>
                  <input v-model="email" type="email" class="user-page__input" placeholder="Enter your email" />
               </label>

               <label class="user-page__label">
                  <span class="user-page__label-text">Phone Number</span>
                  <input
                     v-model="phoneNumber"
                     type="tel"
                     class="user-page__input"
                     :placeholder="phoneNumber ? '' : 'Enter your phone number'"
                     @focus="isEditingPhoneNumber = true"
                  />
               </label>
               <label class="user-page__label user-page__file-label">
                  <span class="user-page__label-text">Change Avatar</span>
                  <input accept="image/*" class="user-page__file-input" type="file" @change="onFileSelected" />
                  <span class="user-page__file-label-text">{{ fileName || 'Choose a file' }}</span>
               </label>

               <button type="submit" class="user-page__button">Update Profile</button>
            </form>

            <button class="user-page__button user-page__button--secondary" @click="addTwoFactorAuth">
               Two-Factor Authentication
            </button>
            <button class="user-page__button user-page__button--logout" @click="onLogout">Log Out</button>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import MainMasterPage from '@/masterPages/MainMasterPage.vue'

const router = useRouter()
const selectedFile = ref(null)
const fileName = ref('')
const name = ref('')
const email = ref('')
const phoneNumber = ref('')

onMounted(async () => {
   try {
      const baseURL =
         process.env.NODE_ENV === 'production' ? 'https://main--mybestcodeup.netlify.app' : 'http://localhost:3000'

      axios
      axios.defaults.baseURL = baseURL
      const response = await axios.get('/api/user-profile', {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
         },
      })
      const user = response.data
      name.value = user.name
      email.value = user.email
      phoneNumber.value = user.phoneNumber || ''
   } catch (error) {
      console.error('Error fetching user profile:', error)
   }
})

function onLogout() {
   localStorage.removeItem('authToken')
   router.push({ name: 'home' })
}

function onFileSelected(event) {
   selectedFile.value = event.target.files[0]
   fileName.value = event.target.files[0] ? event.target.files[0].name : ''
}

function addTwoFactorAuth() {}

function updateProfile() {
   const token = localStorage.getItem('authToken')
   const formData = new FormData()
   formData.append('name', name.value)
   formData.append('email', email.value)
   formData.append('phoneNumber', phoneNumber.value)
   if (selectedFile.value) {
      formData.append('avatar', selectedFile.value)
   }
   const baseURL =
      process.env.NODE_ENV === 'production' ? 'https://main--mybestcodeup.netlify.app' : 'http://localhost:3000'

   axios
   axios.defaults.baseURL = baseURL

   axios
      .post('/api/update-profile', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
         },
      })
      .then((response) => {
         console.log('Profile updated:', response.data)
         const event = new CustomEvent('avatar-updated', {
            detail: { avatar: response.data.avatar },
         })
         window.dispatchEvent(event)
      })
      .catch((err) => {
         console.error('Error updating profile:', err)
      })
}
</script>

<style lang="scss" scoped>
.user-page {
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 30px;
   background-color: #0c0b0b;

   &__container {
      max-width: 700px;
      width: 100%;
      background: #1e1e1e;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 30px;

      .user-page__title {
         font-size: 28px;
         font-weight: 700;
         color: #ecf0f1;
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
         color: #bdc3c7;
         font-weight: 500;
         position: relative;
         cursor: pointer;
         transition: color 0.3s;
      }

      .user-page__file-label {
         align-items: center;
         background: #2c3e50;
         border: 1px solid #444;
         border-radius: 8px;
         padding: 12px;
         gap: 10px;
         display: flex;
         cursor: pointer;
         transition:
            background-color 0.3s,
            border-color 0.3s;
      }

      .user-page__file-label:hover {
         background-color: #34495e;
         border-color: #3498db;
      }

      .user-page__label-text {
         font-size: 16px;
         font-weight: 600;
         color: #ecf0f1;
         margin-bottom: 5px;
      }

      .user-page__file-input {
         display: none;
      }

      .user-page__file-label-text {
         font-size: 14px;
         color: #bdc3c7;
         margin: 0;
      }

      .user-page__input {
         padding: 12px 15px;
         font-size: 16px;
         border: 1px solid #444;
         border-radius: 8px;
         width: 100%;
         background: #2c3e50;
         color: #ecf0f1;
         transition: border-color 0.3s;

         &:focus {
            border-color: #3498db;
            outline: none;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
         }
      }

      .user-page__button {
         background-color: #3498db;
         color: #ecf0f1;
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
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
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

      .user-page__button--edit {
         background-color: #f39c12;
         color: #fff;
         font-size: 14px;
         padding: 8px 12px;
         margin-top: 5px;
         transition: background-color 0.3s;

         &:hover {
            background-color: #e67e22;
         }
      }
   }
   .user-page__file-label {
      align-items: center;
      background: #2c3e50;
      border: 1px solid #444;
      border-radius: 8px;
      padding: 12px;
      gap: 10px;
      display: flex;
      cursor: pointer;
      transition:
         background-color 0.3s,
         border-color 0.3s;
   }

   .user-page__file-label:hover {
      background-color: #34495e;
      border-color: #3498db;
   }

   .user-page__file-label-text {
      font-size: 14px;
      color: #bdc3c7;
      margin: 0;
   }
}
</style>
