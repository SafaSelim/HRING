import { LitElement, html, css } from 'lit';

export class LanguageToggle extends LitElement {
  static styles = css`
    .lang {
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--color-border);
      border-radius: 6px;
      overflow: hidden;
    }
    button {
      background: none;
      border: none;
      color: var(--color-text);
      padding: 0.35rem 0.6rem;
      cursor: pointer;
      font-weight: 600;
    }
    button.active {
      background: rgba(25,118,210,0.06);
      color: var(--color-primary);
    }
  `;

  constructor() {
    super();
    this.lang = this._getLang();
  }

  _getLang() {
    return document.documentElement.lang || 'en';
  }

  _setLang(lang) {
    document.documentElement.lang = lang;
    this.lang = lang;
    window.dispatchEvent(new CustomEvent('lang-changed', { detail: { lang } }));
    this.requestUpdate();
  }

  _onClick(lang) {
    if (lang !== this.lang) this._setLang(lang);
  }

  render() {
    return html`
      <div class="lang" role="group" aria-label="Language">
        <button class="${this.lang === 'en' ? 'active' : ''}" @click=${() => this._onClick('en')}>EN</button>
        <button class="${this.lang === 'tr' ? 'active' : ''}" @click=${() => this._onClick('tr')}>TR</button>
      </div>
    `;
  }
}

customElements.define('language-toggle', LanguageToggle); 