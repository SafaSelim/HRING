import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './components/nav-menu.js';
import './components/theme-toggle.js';
import './components/employee-list/employee-list.js';

export class HRingApp extends LitElement {
  static styles = css`
    main {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      min-height: 100vh;
    }
    #outlet {
      flex: 1;
    }
  `;

  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('outlet');
    const router = new Router(outlet);
    router.setRoutes([
      { path: '/', redirect: '/employees' },
      { path: '/employees', component: 'employee-list' },
      {
        path: '/add',
        action: async () => {
          await import('./components/employee-form/employee-form.js');
          return { component: 'employee-form' };
        }
      },
      {
        path: '/edit/:id',
        action: async () => {
          await import('./components/employee-form/employee-form.js');
          return { component: 'employee-form' };
        }
      },
      { path: '(.*)', redirect: '/employees' }
    ]);
  }

  render() {
    return html`
      <main>
        <theme-toggle></theme-toggle>
        <h1>HRING Employee Management</h1>
        <nav-menu></nav-menu>
        <div id="outlet"></div>
      </main>
    `;
  }
}

customElements.define('hring-app', HRingApp);
