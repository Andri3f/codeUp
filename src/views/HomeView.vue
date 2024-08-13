<template>
   <main-master-page>
      <main-section :coursesList="coursesData.mainCourses" />
   </main-master-page>
</template>

<script setup>
import MainMasterPage from '../masterPages/MainMasterPage.vue'
import MainSection from '../components/home/MainSection.vue'
import coursesData from '../data/mainSection/index'
</script>

<style lang="scss" scoped></style>
