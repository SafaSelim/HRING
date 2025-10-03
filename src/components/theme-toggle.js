import { LitElement, html, css } from 'lit';
import { getLocale } from '../assets/i18n/index.js';
import { iconSun, iconMoon } from '../assets/icons.js';
import { classMap } from 'lit/directives/class-map.js';

export class ThemeToggle extends LitElement {
  static styles = css`
    button {
      background: none;
      border: none;
      padding: 0.4rem 0.6rem;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }

    button.is-light svg {
      color: var(--color-primary);
    }

    button.is-dark svg {
      color: var(--color-text);
    }
  `;

  constructor() {
    super();
    this.theme = this._getTheme();
  }

  _getTheme() {
    return localStorage.getItem('theme') || 'light';
  }

  _setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.theme = theme;
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    this._setTheme(this.theme);
  }

  _toggleTheme() {
    this._setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

 render() {
    const t = getLocale();
    return html`
      <button @click=${this._toggleTheme}
        title="${this.theme === 'dark' ? 'Dark' : 'Light'}"
        class=${classMap({
        'is-dark': this.theme === 'dark',
        'is-light': this.theme === 'light',
        })}
        >
        ${this.theme === 'dark' ? iconMoon : iconSun}
      </button>
    `;
  }
}

customElements.define('theme-toggle', ThemeToggle);
