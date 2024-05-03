import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './en.json'
import zhTranslation from './zh.json'

// 初始化 i18n
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    lng: 'zh', // 預設語言
    fallbackLng: 'zh', // 如果找不到對應語言的翻譯，則使用預設語言
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
