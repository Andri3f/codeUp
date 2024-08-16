<template>
   <section class="master">
      <div class="master__container">
         <h1 class="master__title">{{ $t('titles.mainTitle') }}</h1>
         <div class="master__items">
            <div class="master__item item-master" v-for="courseItem in coursesList" :key="courseItem.id">
               <div class="item-master__content">
                  <h3 class="item-master__title subtitile">{{ courseItem.title }}</h3>
                  <div class="item-master__image"><img :src="getImagePath(courseItem.imgSrc)" alt="" /></div>
                  <ul class="item-master__info">
                     <li class="item-master__item-info" v-for="(infoItem, index) in courseItem.courseInfo" :key="index">
                        {{ infoItem.title }}
                     </li>
                  </ul>
               </div>
               <button class="item-master__button button">{{ $t('buttons.detaildedAboutCourse') }}</button>
               <div class="item-master__price">Price - {{ courseItem.price }} $</div>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { defineProps } from 'vue'
//import { getImagePath } from '../../localScript/functions/index'

const props = defineProps({
   coursesList: {
      type: Array,
      required: true,
   },
})
const getImagePath = (imgPath) => {
   return new URL(`../../assets/img/home/${imgPath}`, import.meta.url).href;
 };
</script>

<style lang="scss" scoped>
.master {
   &:not(:last-child) {
      margin-bottom: clamp(5.625rem, -0.004rem + 11.742vw, 9.375rem);
   }
   &__container {
   }
   &__title {
      text-align: center;
      font-size: clamp(1.7rem, 0.312rem + 2.348vw, 2.188rem);
      &:not(:last-child) {
         margin-bottom: clamp(2.5rem, 0.624rem + 3.914vw, 3.75rem);
      }
   }
   &__items {
      display: grid;
      gap: clamp(2.5rem, 0.624rem + 3.914vw, 3.75rem);
      grid-template-columns: repeat(2, 1fr);
      @media (max-width: 700px) {
         grid-template-columns: 1fr;
         gap: 50px;
      }
   }
}

.item-master {
   max-width: 300px;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   @media (max-width: 700px) {
      width: 100%;
      max-width: 100%;
      margin: auto;
   }

   &__content {
      display: flex;
      flex-direction: column;
      &:not(:last-child) {
         margin-bottom: clamp(1.125rem, 0.187rem + 1.957vw, 1.75rem);
      }
      @media (max-width: 700px) {
      }
   }

   &__title {
      align-self: center;
      letter-spacing: 3px;
      color: #c8cdcf;
      &:not(:last-child) {
         margin-bottom: 20px;
      }
   }

   &__image {
      //align-self: start;
      &:not(:last-child) {
         margin-bottom: clamp(0.938rem, -0.001rem + 1.957vw, 1.563rem);
      }
   position: relative;
      padding-bottom: 81%;
   @media (max-width: 700px){
      padding-bottom: 90%;
        
   }
      img {
         //max-width: 100%;
         position: absolute;width: 100%;height: 100%;top: 0;left: 0;
         object-fit: contain;
      }
   }

   &__item-info {
      position: relative;
      display: flex;
      align-items: center;
      line-height: 1.2;
      padding-left: 20px;
      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, 0.156rem + 0.978vw, 0.938rem);
      }
      &::before {
         content: '';
         flex: 0 0 5px;
         position: absolute;
         background-color: #fff;
         border-radius: 50%;
         width: 5px;
         height: 5px;
         left: 0;
      }
   }

   &__button {
      width: 100%;
      font-size: clamp(1rem, 0.812rem + 0.391vw, 1.125rem);
      font-weight: 500;
      padding: clamp(0.938rem, 0.468rem + 0.978vw, 1.25rem) clamp(1.563rem, 1.093rem + 0.978vw, 1.875rem);
      &:not(:last-child) {
         margin-bottom: clamp(0.625rem, -0.313rem + 1.957vw, 1rem);
      }
   }

   &__price {
      font-size: clamp(1.25rem, 0.468rem + 1.37vw, 1.563rem);
      font-weight: 600;
      color: #ffee6c;
      margin-top: 1rem;
   }
}
</style>
