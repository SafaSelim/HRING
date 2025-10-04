import { LitElement, html, css } from 'lit';
import { iconClose } from '../assets/icons';
import { getLocale } from '../assets/i18n';

export class ConfirmDialog extends LitElement {
  static styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      align-items: center;
      justify-content: center;
    }

    :host([open]) {
      display: flex;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
    }

    .dialog {
      position: relative;
      background: var(--color-bg);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      max-width: 500px;
      width: 90%;
      padding: 32px;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dialog-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .dialog-title {
      font-size: 24px;
      font-weight: 600;
      color: var(--color-primary);
      margin: 0;
    }

    .close-button {
      background: none;
      border: none;
      color: var(--color-primary);
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }

    .close-button:hover {
      background-color: rgba(255, 98, 0, 0.1);
    }

    .close-icon {
      width: 24px;
      height: 24px;
    }

    .dialog-content {
      color: var(--color-text);
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .dialog-actions {
      display: flex;
      gap: 16px;
      justify-content: stretch;
    }

    .btn {
      flex: 1;
      padding: 14px 24px;
      font-size: 16px;
      font-weight: 500;
      font-family: inherit;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
    }

    .btn:active {
      transform: scale(0.98);
    }

    .btn-primary {
      background-color: var(--color-primary);
      color: #fff;
    }

    .btn-primary:hover {
      background-color: var(--color-primary);
    }

    .btn-secondary {
      background-color: var(--color-bg);
      color: var(--color-secondary);
      border: 2px solid var(--color-border);
    }

    .btn-secondary:hover {
      border-color: var(--color-secondary);
    }
  `;

  static properties = {
    open: { type: Boolean, reflect: true },
    close: { type: Boolean, reflect: true},
    title: { type: String },
    message: { type: String },
    confirmText: { type: String },
    cancelText: { type: String }
  };

  constructor() {
    super();
    this.open = false;
    this.title = 'Are you sure?';
    this.message = 'This action cannot be undone.';
    this.confirmText = 'Proceed';
    this.cancelText = 'Cancel';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
  }

  _handleKeydown(e) {
    if (e.key === 'Escape' && this.open) {
      this.close();
    }
  }

  _handleOverlayClick(e) {
    if (e.target.classList.contains('overlay')) {
      this.close();
    }
  }

  close() {
    this.open = false;
    this.close = true;
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true }));
  }

  confirm() {
    this.open = false;
    this.close = true;
    this.dispatchEvent(new CustomEvent('confirm', { bubbles: true }));
  }

  render() {
    const t = getLocale();
    return html`
      <div class="overlay" @click=${this._handleOverlayClick}></div>
      <div class="dialog">
        <div class="dialog-header">
          <h2 class="dialog-title">${this.title}</h2>
          <button class="close-button" @click=${this.close} aria-label="Close">
            <span class="close-icon">${iconClose}</span>
          </button>
        </div>
        
        <div class="dialog-content">
          ${this.message}
        </div>
        
        <div class="dialog-actions">
          <button class="btn btn-primary" @click=${this.confirm}>
            ${this.confirmText}
          </button>
          <button class="btn btn-secondary" @click=${this.close}>
            ${this.cancelText}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('confirm-dialog', ConfirmDialog);