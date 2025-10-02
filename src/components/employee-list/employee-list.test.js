import { fixture, html } from '@open-wc/testing';
import { screen, within } from '@testing-library/dom';
import './employee-list.js';

describe('EmployeeList', () => {
  it('renders the employee list component', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    expect(el).toBeDefined();
    expect(el.shadowRoot.querySelector('h2').textContent).toMatch(/Employee/i);
  });

  it('shows toggle for list and table view', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    const radios = el.shadowRoot.querySelectorAll('input[type="radio"]');
    expect(radios.length).toBe(2);
  });

  it('shows search input', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    const search = el.shadowRoot.querySelector('input[type="search"]');
    expect(search).toBeDefined();
  });
});
