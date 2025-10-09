<template>
  <div class="container py-4">
    <div>
      <h1>{{ t('welcome') }}</h1>
      <p>{{ t('hello', { name: 'John' }) }}</p>
      <button>{{ t('cancel') }}</button>
      <button>{{ t('confirm') }}</button>
    </div>
    <div class="is-flex is-gap-2 mt-2">
      <button class="button is-primary" @click="switchLang('en')">English</button>
      <button class="button is-primary" @click="switchLang('fr')">Français</button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
function switchLang(lang) {
  locale.value = lang
}
</script>
