<template>
   <section class="master">
      <div class="master__container">
         <h1 class="master__title">{{ $t('titles.mainTitle') }}</h1>
      </div>
   </section>
</template>

<script setup>
import { defineProps } from 'vue'

// Оголошення пропсів
const props = defineProps({
   coursesList: {
      type: Array,
      required: true,
   },
})
</script>

<style lang="scss" scoped></style>
