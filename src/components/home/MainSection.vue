<template>
   <section class="master">
      <div class="master__container">
         <h1 class="master__title">{{ $t('titles.mainTitle') }}</h1>

         <div class="master__item item-master" v-for="courseItem in coursesList" :key="courseItem.id">
            <h3 class="item-master__title">{{ courseItem.title }}</h3>
            <div class="item-master__image"><img :src="getImagePath(courseItem.imgSrc)" alt="" /></div>
            <ul class="item-master__ifo">
               <li class="item-master__item-info" v-for="(infoItem, index) in courseItem.courseInfo" :key="index">
                  {{ infoItem.title }}
               </li>
            </ul>
            <button class="item-master__button">{{ $t('buttons.detaildedAboutCourse') }}</button>
            <div class="item-master__price">Price - {{ courseItem.price }}</div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { defineProps } from 'vue'
import { getImagePath } from '../../localScript/functions/index'
// Оголошення пропсів
const props = defineProps({
   coursesList: {
      type: Array,
      required: true,
   },
})
</script>

<style lang="scss" scoped>
.master {
}
.master__container {
}
.master__title {
}
.master__item {
}
.item-master {
}
.item-master__title {
}
.item-master__image {
}
.item-master__ifo {
}
.item-master__item-info {
}
.item-master__button {
}
.item-master__price {
}
</style>
