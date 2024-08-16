<template>
   <section class="reaons">
      <div class="reaons__container">
         <h3 class="reaons__title title">Why CodeUp ?</h3>
         <div class="reaons__list list-reasons">
            <div class="list-reasons__item item-reason" v-for=" (reasonItem, index) in reasonsList" :key="reasonItem.id">
               <div class="item-reason__number">{{index +1}}</div>
               <div class="item-reason__content">
                  <h4 class="item-reason__title subtitile">{{reasonItem.title}}</h4>
                  <div class="item-reason__text">
                     <p>{{reasonItem.description}}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>
   

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
   reasonsList: {
      type: Array,
      required: true,
   },
})
</script>

//<style lang="scss" scoped>
//.reaons {
//		// .reaons__container
//		&__container {
//		}
//		// .reaons__title
//		&__title {
//         &:not(:last-child) {
//            margin-bottom: 60px;
//         }
//		}
//		// .reaons__list
//		&__list {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(350px, 1fr) );
//         gap: 70px;
//		}
//}
//.title {
//}
//.list-reasons {
//		// .list-reasons__item
//		&__item {
//		}
//}
//.item-reason {
//   display: flex;
//   gap: 20px;
//   align-items: start;
//		// .item-reason__number
//		&__number {
//         position: relative;	
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         flex:  0 0 50px;
//         width: 50px;
//         height: 50px;
//         padding: 5px;
//         border: 1px solid #234c5c;
//         border-radius: 50%;
         
//		}
//		// .item-reason__content
//		&__content {
//		}
//		// .item-reason__title
//		&__title {
//         &:not(:last-child) {
//            margin-bottom: clamp(1.563rem, 1.093rem + 0.978vw, 1.875rem);
//         }
//		}
//		// .item-reason__text
//		&__text {
//         line-height: 1.5;
//		}
//}



//</style>


<style lang="scss" scoped>
.reaons {
   background-color: #1a1a1a; 
   padding: 40px 20px;
      border-radius: 12px;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5); 
   &__container {
   }
   &__title {
      text-align: center;
      color: #f0f0f0; 
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      &:not(:last-child) {
         margin-bottom: 60px;
      }
   }
   &__list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 50px;
   }
}

.list-reasons {
   &__item {
      display: flex;
      gap: 20px;
      align-items: start;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background-color: #2b2b2b; 
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.8); 
      @media (any-hover: hover){
         &:hover {
            transform: translateY(-10px); 
            box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.9); 
         }
      }
   }
}

.item-reason {
   &__number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px; 
      height: 50px;
      flex: 0 0 50px;
      background-color: #3498db; 
      color: #ffffff;
      font-weight: 700;
      border-radius: 50%;
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.6);

   }
   &__content {
      max-width: 400px;
   }
   &__title {
      color: #ffffff; 
      font-weight: 600;
      &:not(:last-child) {
         margin-bottom: 15px;
      }
   }
   &__text {
      color: #b0b0b0; 
      line-height: 1.7;
   }
}
</style>