import { fixture, html, expect } from '@open-wc/testing';
import './theme-toggle.js';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.removeItem('theme');
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders and defaults to light theme', async () => {
    const el = await fixture(html`<theme-toggle></theme-toggle>`);
    expect(el.theme).to.equal('light');
    expect(document.documentElement.getAttribute('data-theme')).to.equal('light');
  });

  it('toggles to dark theme on click', async () => {
    const el = await fixture(html`<theme-toggle></theme-toggle>`);
    const btn = el.shadowRoot.querySelector('button');
    btn.click();
    await el.updateComplete;
    expect(el.theme).to.equal('dark');
    expect(document.documentElement.getAttribute('data-theme')).to.equal('dark');
    expect(localStorage.getItem('theme')).to.equal('dark');
  });

  it('toggles back to light theme on second click', async () => {
    const el = await fixture(html`<theme-toggle></theme-toggle>`);
    const btn = el.shadowRoot.querySelector('button');
    btn.click();
    await el.updateComplete;
    btn.click();
    await el.updateComplete;
    expect(el.theme).to.equal('light');
    expect(document.documentElement.getAttribute('data-theme')).to.equal('light');
    expect(localStorage.getItem('theme')).to.equal('light');
  });

  it('respects theme from localStorage', async () => {
    localStorage.setItem('theme', 'dark');
    const el = await fixture(html`<theme-toggle></theme-toggle>`);
    expect(el.theme).to.equal('dark');
    expect(document.documentElement.getAttribute('data-theme')).to.equal('dark');
  });
});
