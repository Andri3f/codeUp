import { createI18n } from 'vue-i18n'
import localesEN from '@/locales/en.json'
import localesUA from '@/locales/ua.json'

const i18n = createI18n({
   legacy: false, //for Composition API
   locale: import.meta.env.VITE_I18N_LOCALE || 'en',
   fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'ua',
   messages: {
      en: localesEN,
      ua: localesUA,
   },
   globalInjection: true,
})

export default i18n
