import { fixture, html, expect } from "@open-wc/testing";
import './employee-list.js';

describe('EmployeeList', () => {
  it('renders the employee list component', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    expect(el).to.not.be.undefined;
    // The title is in .header-row > span
    const title = el.shadowRoot.querySelector('.header-row span');
    expect(title).to.not.be.undefined;
    expect(title.textContent).to.match(/Employee/i);
  });

  it('shows toggle for list and table view', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    const toggle = el.shadowRoot.querySelector('.view-toggle');
    expect(toggle).to.not.be.undefined;
    const buttons = toggle.querySelectorAll('button');
    expect(buttons.length).to.equal(2);
  });

  it('shows search input', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    const search = el.shadowRoot.querySelector('.search-field input[type="search"]');
    expect(search).to.not.be.undefined;
  });
});
