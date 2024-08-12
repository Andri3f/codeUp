<template>
   <div class="wrapper">
      <header-comp />
      <main class="master">
         <slot></slot>
      </main>
   </div>
</template>

<script setup>
import HeaderComp from '../components/header/HeaderComp.vue'
</script>

<style lang="scss" scoped></style>
