// Simple localization utility
import en from './en.js';
import tr from './tr.js';

const locales = { en, tr };

export function getLocale() {
  const lang = document.documentElement.lang || 'en';
  return locales[lang] || en;
} 