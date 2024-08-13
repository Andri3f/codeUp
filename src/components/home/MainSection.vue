<template>
   <section class=""></section>
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
