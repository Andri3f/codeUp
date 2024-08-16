//const getImagePath = (imgPath) => new URL(`${imgPath}`, import.meta.url).href
//export { getImagePath }
const getImagePath = (imgPath) => {
   return new URL(`../../assets/img/home/${imgPath}`, import.meta.url).href;
 };
 export { getImagePath };