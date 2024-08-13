const getImagePath = (imgPath) => new URL(`${imgPath}`, import.meta.url).href
export { getImagePath }
