import { LitElement, html, css } from 'lit';

export class ThemeToggle extends LitElement {
  static styles = css`
    button {
      background: none;
      border: 1px solid var(--color-border);
      color: var(--color-text);
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 1rem;
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
    return html`
      <button @click=${this._toggleTheme}>
        ${this.theme === 'dark' ? '🌙 Dark' : '☀️ Light'} Mode
      </button>
    `;
  }
}

customElements.define('theme-toggle', ThemeToggle);
