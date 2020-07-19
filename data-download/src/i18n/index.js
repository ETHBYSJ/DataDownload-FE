import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const languages = [
  {value: 'en-US', label: 'English'},
  {value: 'zh-CN', label: '简体中文'}
]
const messages = {}

for(let lang of languages) {
  let locale = lang.value
  let m = require(`./lang/${locale}`).m
  messages[locale] = {m: m}
}
// console.log(messages)
export default new VueI18n({
  locale: 'zh-CN',
  messages: messages
})

export {languages}
