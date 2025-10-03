import { LitElement, html, css } from 'lit';
import { turkeyFlagSVG, ukFlagSVG } from '../assets/icons';

export class LanguageToggle extends LitElement {
  static styles = css`
    .lang {
      display: inline-flex;
      align-items: center;
      overflow: hidden;
    }
    button {
      background: none;
      border: none;
      padding: 0.35rem 0.6rem 0.15rem;
      cursor: pointer;
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
       ${this.lang === 'en'
        ? html`
            <button
              class="${this.lang === 'en' ? 'active' : ''}"
              @click=${() => this._onClick('tr')}
            >
              ${ukFlagSVG}
            </button>
          `
        : html`
            <button
              class="${this.lang === 'tr' ? 'active' : ''}"
              @click=${() => this._onClick('en')}
            >
              ${turkeyFlagSVG}
            </button>
          `}
      </div>
    `;
  }
}

customElements.define('language-toggle', LanguageToggle); 