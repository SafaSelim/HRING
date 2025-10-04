export function replaceParameters(text, key, params = {}) {
    const keys = key.split('.');
    let value = text;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (!value) return key;
    
    return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] || match;
    });
  }