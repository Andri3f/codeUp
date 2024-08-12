<template>
   <main-master-page></main-master-page>
</template>

<script setup>
import { onMounted } from 'vue'
import MainMasterPage from '../masterPages/MainMasterPage.vue'
const apiUrl = 'https://dev.to/api/articles?per_page=10&tag=programming&top=1'

onMounted(() => {
   async function fetchProgrammingNews() {
      try {
         const response = await fetch(apiUrl)
         const newsData = await response.json()
         const topNews = newsData.slice(0, 10)
         console.log(topNews)
      } catch (error) {
         console.error('Помилка при отриманні новин:', error)
      }
   }
   fetchProgrammingNews()
})
</script>

<style lang="scss" scoped></style>
