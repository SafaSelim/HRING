import { css } from 'lit';

export const sharedFormStyles = css`
  /* Input Base Styles */
  .input-base {
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    font-family: inherit;
    color: var(--color-text);
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease;
  }

  .input-base:hover {
    border-color: var(--color-primary);
    opacity: 0.8;
  }

  .input-base:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.1);
  }

  .input-base::placeholder {
    color: var(--color-text);
    opacity: 0.5;
  }

  /* Text Input */
  .input-text {
    /* Inherits from input-base */
  }

  /* Date Input with Icon */
  .input-date-wrapper {
    position: relative;
    width: 100%;
  }

  .input-date {
    padding-right: 44px;
  }

  .input-date::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    right: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .input-date-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-primary);
    width: 20px;
    height: 20px;
  }

  /* Select Dropdown */
  .select-wrapper {
    position: relative;
    width: 100%;
  }

  .input-select {
    appearance: none;
    padding-right: 44px;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
  }

  .input-select:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23ff6200' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }

  /* Form Label */
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
    margin-bottom: 8px;
  }

  /* Form Field Container */
  .form-field {
    margin-bottom: 24px;
  }

  /* Button Base */
  .btn {
    padding: 12px 32px;
    font-size: 16px;
    font-weight: 500;
    font-family: inherit;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease, opacity 0.2s ease;
    outline: none;
    min-width: 140px;
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Primary Button (Save) */
  .btn-primary {
    background-color: var(--color-primary);
    color: #fff;
    border: none;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #ff7a26;
  }

  .btn-primary:focus {
    box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.3);
  }

  /* Secondary Button (Cancel) */
  .btn-secondary {
    background-color: var(--color-bg);
    color: var(--color-secondary);
    border: 2px solid var(--color-border);
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: var(--color-bg);
    border-color: var(--color-secondary);
    opacity: 0.9;
  }

  .btn-secondary:focus {
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(82, 80, 153, 0.1);
  }

  /* Button Group */
  .btn-group {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 32px;
  }

  /* Form Grid Layouts */
  .form-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .form-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  @media (max-width: 768px) {
    .form-grid-2,
    .form-grid-3 {
      grid-template-columns: 1fr;
    }
  }

  /* Error State */
  .input-error {
    border-color: var(--color-error);
  }

  .input-error:focus {
    border-color: var(--color-error);
    box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
  }

  .error-message {
    color: var(--color-error);
    font-size: 12px;
    margin-top: 4px;
  }

  /* Success State */
  .input-success {
    border-color: #10b981;
  }

  .input-success:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;