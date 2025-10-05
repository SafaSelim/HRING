import { fixture, html, expect } from '@open-wc/testing';
import './employee-form.js';

describe('EmployeeForm', () => {
  it('renders the employee form component', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
  expect(el).to.not.be.undefined;
  expect(el.shadowRoot.querySelector('form')).to.not.be.undefined;
  });

  it('shows all required input fields', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const fields = [
      'firstName', 'lastName', 'dateOfEmployment', 'dateOfBirth',
      'phoneNumber', 'email', 'department', 'position'
    ];
    for (const name of fields) {
      const input = el.shadowRoot.querySelector(`[name="${name}"]`);
    expect(input).to.not.be.undefined;
    }
  });

  it('shows validation errors for empty required fields', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await el.updateComplete;
  expect(Object.keys(el.errors).length).to.be.greaterThan(0);
  });
});
