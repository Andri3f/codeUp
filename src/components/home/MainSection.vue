<template>
   <section class="master">
      <div class="master__container">
         <h1 class="master__title">{{ $t('titles.mainTitle') }}</h1>
         <div class="master__item item-master">
            <h3 class="item-master__title"></h3>
            <div class="item-master__image"><img src="" alt="" /></div>
            <ul class="item-master__ifo">
               <li class="item-master__item-info"></li>
            </ul>
            <button class="item-master__button">{{ $t('buttons.detaildedAboutCourse') }}</button>
         </div>
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
