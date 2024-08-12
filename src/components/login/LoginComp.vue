<template>
   <div>
      <div><input v-model="userData.name" type="text" /> <label>name</label></div>
      <div><input v-model="userData.mail" type="email" /> <label>mail</label></div>
      <div><input v-model="userData.pass" type="password" /> <label>pass</label></div>
      <div><input v-model="userData.passConfirm" type="password" /> <label>pass again</label></div>
      <button @click="onLogin">Login</button>
   </div>
</template>

<script setup>
import { reactive } from 'vue'

const userData = reactive({})

function onLogin() {
   // userData.nmae
}
</script>

<style lang="scss" scoped></style>
