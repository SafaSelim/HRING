import { LitElement, html, css } from 'lit';
import { getLocale } from '../i18n/index.js';
import { Router } from '@vaadin/router';

export class NavMenu extends LitElement {
  static styles = css`
    nav {
      display: flex;
      gap: 1rem;
      background: #f5f5f5;
      padding: 1rem;
    }
    a {
      text-decoration: none;
      color: #333;
      font-weight: bold;
    }
    a.active {
      color: #1976d2;
    }
  `;

  render() {
    const t = getLocale();
    return html`
      <nav>
        <a href="/employees" @click=${this._navigate}>${t.nav.employees}</a>
        <a href="/add" @click=${this._navigate}>${t.nav.add}</a>
      </nav>
    `;
  }

  _navigate(e) {
    e.preventDefault();
    Router.go(e.target.getAttribute('href'));
  }
}

customElements.define('nav-menu', NavMenu);
