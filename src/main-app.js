import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './components/nav-menu.js';
import './components/theme-toggle.js';
import './components/employee-list/employee-list.js';
import { getLocale } from './assets/i18n/index.js';
import './components/language-toggle.js';

export class MainApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-bg);
      color: var(--color-text);
      font-family: var(--app-font-family, 'Roboto', sans-serif);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.25rem 1rem;
      position: sticky;
      top: 0;
      z-index: 10;
      background: var(--color-bg);
      border-bottom: 1px solid var(--color-border);
      gap: 0.75rem;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      font-size: 1rem;
      white-space: nowrap;
      color: var(--color-primary);
    }
    .brand img {
      height: 20px;
      width: auto;
      display: block;
    }
    .spacer {
      flex: 1 1 auto;
    }
    nav-menu {
      flex: 0 1 auto;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: nowrap;
    }
    main {
      display: block;
      padding: 1rem;
      margin: 0 auto;
    }
    @media (max-width: 700px) {
      header {
        flex-wrap: wrap;
        align-items: flex-start;
      }
      .brand { order: 1; width: auto; }
      nav-menu { order: 3; width: 100%; }
      .header-right { order: 2; margin-left: auto; }
    }
    #outlet {
      min-height: 50vh;
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

  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('outlet');
    const router = new Router(outlet);
    router.setRoutes([
      { path: '/', redirect: '/employees' },
      { path: '/employees', component: 'employee-list' },
      {
        path: '/add',
        component: 'employee-form',
        action: async () => {
          await import('./components/employee-form/employee-form.js');
        }
      },
      {
        path: '/edit/:id',
        component: 'employee-form',
        action: async () => {
          await import('./components/employee-form/employee-form.js');
        }
      },
      { path: '(.*)', redirect: '/employees' }
    ]);
  }

  render() {
    const t = getLocale();
    return html`
      <header>
        <div class="brand"><img src="./assets/images/ing-logo.svg" alt="ING" />${t.appTitle}</div>
        <div class="spacer"></div>
        <nav-menu></nav-menu>
        <div class="header-right">
          <language-toggle></language-toggle>
          <theme-toggle></theme-toggle>
        </div>
      </header>
      <main>
        <div id="outlet"></div>
      </main>
    `;
  }
}

customElements.define('main-app', MainApp);
