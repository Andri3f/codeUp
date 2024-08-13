<script setup>
import { onMounted, nextTick } from 'vue'

onMounted(() => {
   nextTick(() => {
      requestAnimationFrame(() => {
         document.documentElement.classList.add('loaded')
      })
   })

   const updateResponsiveClass = () => {
      if (window.innerWidth < 768) {
         document.documentElement.classList.add('mobile')
         document.documentElement.classList.remove('pc')
      } else {
         document.documentElement.classList.add('pc')
         document.documentElement.classList.remove('mobile')
      }
   }

   updateResponsiveClass()

   window.addEventListener('resize', updateResponsiveClass)
})
</script>
<template>
   <RouterView />
</template>

<style lang="scss" scoped></style>
