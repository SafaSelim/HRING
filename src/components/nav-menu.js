import { LitElement, html, css } from 'lit';
import { getLocale } from '../assets/i18n/index.js';
import { Router } from '@vaadin/router';
import { iconEmployees, iconPlus } from '../assets/icons.js';

export class NavMenu extends LitElement {
  static styles = css`
    nav {
      display: flex;
      gap: 0.75rem;
      padding: 0.25rem 0;
      flex-wrap: wrap;
    }
    a {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      text-decoration: none;
      color: var(--color-primary);
      font-weight: 400;
      padding: 0.35rem 0.6rem;
    }
    a:hover {
      background: rgba(0,0,0,0.03);
      border-radius: 4px;
    }
    a.active {
      color: var(--color-primary);
    
    }
    @media (max-width: 700px) {
      nav { width: 100%; }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._onLang = () => this.requestUpdate();
    window.addEventListener('lang-changed', this._onLang);
  }

  disconnectedCallback() {
    window.removeEventListener('lang-changed', this._onLang);
    super.disconnectedCallback();
  }

  render() {
    const t = getLocale();
    const path = window.location.pathname;
    return html`
      <nav>
        <a href="/employees" class="${path.startsWith('/employees') ? 'active' : ''}" @click=${this._navigate} title="${t.nav.employees}">${iconEmployees}<span>${t.nav.employees}</span></a>
        <a href="/add" class="${path.startsWith('/add') ? 'active' : ''}" @click=${this._navigate} title="${t.nav.add}">${iconPlus}<span>${t.nav.add}</span></a>
      </nav>
    `;
  }

  _navigate(e) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    Router.go(href);
  }
}

customElements.define('nav-menu', NavMenu);
