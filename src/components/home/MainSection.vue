<template>
   <section class="master">
      <div class="master__container">
         <h1 class="master__title">{{ $t('titles.mainTitle') }}</h1>
         <div class="master__items">
            <div class="master__item item-master" v-for="courseItem in coursesList" :key="courseItem.id">
               <h3 class="item-master__title">{{ courseItem.title }}</h3>
               <div class="item-master__image"><img :src="getImagePath(courseItem.imgSrc)" alt="" /></div>
               <ul class="item-master__info">
                  <li class="item-master__item-info" v-for="(infoItem, index) in courseItem.courseInfo" :key="index">
                     {{ infoItem.title }}
                  </li>
               </ul>
               <button class="item-master__button button">{{ $t('buttons.detaildedAboutCourse') }}</button>
               <div class="item-master__price">Price - {{ courseItem.price }} $</div>
            </div>
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
   // .master__container
   &__container {
   }
   // .master__title
   &__title {
      text-align: center;
      font-size: clamp(1.438rem, 0.312rem + 2.348vw, 2.188rem);
      &:not(:last-child) {
         margin-bottom: clamp(1.563rem, 0.155rem + 2.935vw, 2.5rem);
      }
   }
   //&__items
   &__items {
      display: grid;
      gap: clamp(2.5rem, 0.624rem + 3.914vw, 3.75rem);
      text-align: center;
      grid-template-columns: repeat(2, 1fr);
   }
}
.item-master {
   // .item-master__title
   &__title {
   }
   // .item-master__image
   &__image {
      max-width: 100%;
      position: relative;

      padding-bottom: 37.5%;
      img {
         position: absolute;
         width: 100%;
         height: 100%;
         top: 0;
         left: 0;
         object-fit: contain;
      }
   }
   // .item-master__ifo
   &__info {
   }
   // .item-master__item-info
   &__item-info {
      position: relative;

      display: flex;

      align-items: center;
      line-height: 1.2;
      &:not(:last-child) {
         margin-bottom: 10px;
      }
      &::before {
         content: '';
         flex: 0 0 5px;
         position: absolute;
         background-color: #fff;
         border-radius: 50%;
         width: 5px;
         height: 5px;
         left: -20px;
      }
   }
   // .item-master__button
   &__button {
      font-size: 18px;
      font-weight: 500;
      padding: clamp(0.938rem, 0.468rem + 0.978vw, 1.25rem) clamp(1.563rem, 1.093rem + 0.978vw, 1.875rem);
      &:not(:last-child) {
         margin-bottom: clamp(1.25rem, 0.312rem + 1.957vw, 1.875rem);
      }
   }
   // .item-master__price
   &__price {
      font-size: 25px;
      font-weight: 600;
      color: #bcb48e;
   }
}
</style>
