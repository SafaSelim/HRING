import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import './confirm-dialog.js';

describe('ConfirmDialog', () => {
  it('renders with default properties', async () => {
    const el = await fixture(html`<confirm-dialog></confirm-dialog>`);
    expect(el.title).to.equal('Are you sure?');
    expect(el.message).to.equal('This action cannot be undone.');
    expect(el.confirmText).to.equal('Proceed');
    expect(el.cancelText).to.equal('Cancel');
  });

  it('reflects open attribute', async () => {
    const el = await fixture(html`<confirm-dialog open></confirm-dialog>`);
    expect(el.hasAttribute('open')).to.be.true;
    el.open = false;
    await el.updateComplete;
    expect(el.hasAttribute('open')).to.be.false;
  });

  it('fires confirm event and closes on confirm', async () => {
    const el = await fixture(html`<confirm-dialog open></confirm-dialog>`);
    const btn = el.shadowRoot.querySelector('.btn-primary');
    setTimeout(() => btn.click());
    const ev = await oneEvent(el, 'confirm');
    expect(ev).to.exist;
    expect(el.open).to.be.false;
  });

  it('fires cancel event and closes on cancel', async () => {
    const el = await fixture(html`<confirm-dialog open></confirm-dialog>`);
    const btn = el.shadowRoot.querySelector('.btn-secondary');
    setTimeout(() => btn.click());
    const ev = await oneEvent(el, 'cancel');
    expect(ev).to.exist;
    expect(el.open).to.be.false;
  });

  it('closes when overlay is clicked', async () => {
    const el = await fixture(html`<confirm-dialog open></confirm-dialog>`);
    const overlay = el.shadowRoot.querySelector('.overlay');
    setTimeout(() => overlay.click());
    const ev = await oneEvent(el, 'cancel');
    expect(ev).to.exist;
    expect(el.open).to.be.false;
  });
});
