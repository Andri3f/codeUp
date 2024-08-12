<template>
   <main-master-page>
      <section class="news">
         <div class="news__conatiner">
            <h2 class="news__title">News Title</h2>
            <article class="news__item" v-for="(newsItem, indx) in newsList" :key="indx">
               {{ newsItem }}
               <!-- або інша властивість, що вам потрібна -->
            </article>
         </div>
      </section>
   </main-master-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MainMasterPage from '../masterPages/MainMasterPage.vue'

let newsList = ref([])

onMounted(() => {
   const apiUrl = 'https://dev.to/api/articles?per_page=10&tag=programming&top=1'
   async function fetchProgrammingNews() {
      try {
         const response = await fetch(apiUrl)
         const newsData = await response.json()
         const topNews = newsData.slice(0, 10)
         console.log(topNews)
         newsList.value = topNews
      } catch (error) {
         console.error('Помилка при отриманні новин:', error)
      }
   }
   fetchProgrammingNews()
})
</script>

<style lang="scss" scoped></style>
