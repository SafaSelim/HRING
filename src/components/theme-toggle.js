import { LitElement, html, css } from 'lit';
import { getLocale } from '../assets/i18n/index.js';
import { iconSun, iconMoon } from '../assets/icons.js';

export class ThemeToggle extends LitElement {
  static styles = css`
    button {
      background: none;
      border: 1px solid var(--color-border);
      color: var(--color-text);
      padding: 0.4rem 0.6rem;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
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
      <button @click=${this._toggleTheme} title="${this.theme === 'dark' ? 'Dark' : 'Light'}">
        ${this.theme === 'dark' ? iconMoon : iconSun}
      </button>
    `;
  }
}

customElements.define('theme-toggle', ThemeToggle);
