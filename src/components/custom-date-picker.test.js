import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import './custom-date-picker.js';

describe('CustomDatePicker', () => {
  it('renders with default properties', async () => {
    const el = await fixture(html`<custom-date-picker></custom-date-picker>`);
    expect(el.value).to.equal('');
    expect(el.name).to.equal('');
    expect(el.required).to.be.false;
    expect(el.open).to.be.false;
    const input = el.shadowRoot.querySelector('.date-input');
    expect(input).to.exist;
    expect(input.readOnly).to.be.true;
  });

  it('selects a date and fires change event', async () => {
    const el = await fixture(html`<custom-date-picker open></custom-date-picker>`);
    // Find a day in the current month
    const day = el.shadowRoot.querySelector('.calendar-day:not(.other-month)');
    setTimeout(() => day.click());
    const ev = await oneEvent(el, 'change');
    expect(ev).to.exist;
    expect(el.value).to.match(/^\d{4}-\d{2}-\d{2}$/);
    expect(el.open).to.be.false;
  });

  it('reflects value property and updates selectedDate', async () => {
    const el = await fixture(html`<custom-date-picker value="2022-01-15"></custom-date-picker>`);
    expect(el.value).to.equal('2022-01-15');
    expect(el.selectedDate).to.be.an.instanceof(Date);
    expect(el.selectedDate.getFullYear()).to.equal(2022);
    expect(el.selectedDate.getMonth()).to.equal(0); // January
    expect(el.selectedDate.getDate()).to.equal(15);
  });

  it('navigates months and years', async () => {
    const el = await fixture(html`<custom-date-picker open></custom-date-picker>`);
    const prevBtn = el.shadowRoot.querySelectorAll('.nav-button')[0];
    const nextBtn = el.shadowRoot.querySelectorAll('.nav-button')[1];
    const monthSelect = el.shadowRoot.querySelector('.month-select');
    const yearSelect = el.shadowRoot.querySelector('.year-select');
    const initialMonth = el.currentDate.getMonth();
    prevBtn.click();
    await el.updateComplete;
    expect(el.currentDate.getMonth()).to.equal((initialMonth + 11) % 12);
    nextBtn.click();
    await el.updateComplete;
    expect(el.currentDate.getMonth()).to.equal(initialMonth);
    // Change month via select
    monthSelect.value = '5';
    monthSelect.dispatchEvent(new Event('change'));
    await el.updateComplete;
    expect(el.currentDate.getMonth()).to.equal(5);
    // Change year via select
    yearSelect.value = '2030';
    yearSelect.dispatchEvent(new Event('change'));
    await el.updateComplete;
    expect(el.currentDate.getFullYear()).to.equal(2030);
  });
});
