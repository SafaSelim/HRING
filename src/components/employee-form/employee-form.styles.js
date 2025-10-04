import { css } from 'lit';

export const employeeFormStyles = css`
  :host {
    display: block;
    padding: 0;
    max-width: 1400px;
    margin: 0 auto;
    background: var(--color-bg)
    color: var(--color-text);
    min-height: 100vh;
  }
  .form-header {
    padding: 2rem;
    margin-bottom: 0;
  }
  .form-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
    margin: 0;
  }
  .form-subtitle {
    font-size: 1rem;
    color: var(--color-text);
    margin: 0 0.5rem 1.5rem 0;
    font-weight: 400;
  }
  .form-card {
    background: var(--color-bg-card);
    margin: 0 1rem 2rem 1rem;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: none;
  }
  .form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3.5rem;
    width: 80%;
    margin: 0 auto;
  }
  .form-field {
    margin-bottom: 0;
  }
  .form-field label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    margin-bottom: 0.5rem;
  }
  .form-field input,
  .form-field select {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.875rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-bg);
    color: var(--color-text);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .form-field input:focus,
  .form-field select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.1);
  }
  .form-field input[type="date"] {
    position: relative;
  }
  .form-field input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    right: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  
  /* Custom date picker styling */
  .form-field input[type="date"]::-webkit-datetime-edit {
    color: var(--color-text);
  }
  
  .form-field input[type="date"]::-webkit-datetime-edit-fields-wrapper {
    background: transparent;
  }
  
  .form-field input[type="date"]::-webkit-datetime-edit-text {
    color: var(--color-text);
    padding: 0 0.25rem;
  }
  
  .form-field input[type="date"]::-webkit-datetime-edit-month-field,
  .form-field input[type="date"]::-webkit-datetime-edit-day-field,
  .form-field input[type="date"]::-webkit-datetime-edit-year-field {
    color: var(--color-text);
    background: transparent;
  }
  
  .form-field input[type="date"]::-webkit-datetime-edit-month-field:focus,
  .form-field input[type="date"]::-webkit-datetime-edit-day-field:focus,
  .form-field input[type="date"]::-webkit-datetime-edit-year-field:focus {
    background-color: rgba(255, 98, 0, 0.1);
    color: var(--color-primary);
    outline: none;
  }
  
  /* Date picker popup styling */
  .form-field input[type="date"]::-webkit-calendar-picker-indicator:hover {
    background-color: rgba(255, 98, 0, 0.1);
  }
  .form-field .date-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-primary);
    width: 20px;
    height: 20px;
  }
  .form-field select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 40px;
  }
  .form-field select:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23ff6200' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }
  .btn-group {
    grid-column: 1 / -1;
    display: flex;
    gap: 3rem;
    justify-content: center;
    margin-top: 2rem;
  }
  .btn {
    padding: 0.75rem 3rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 25%;
    flex: 0 0 auto;
  }
  .btn-primary {
    background-color: var(--color-primary);
    color: #fff;
  }
  .btn-primary:hover {
    background-color: #ff7a26;
  }
  .btn-secondary {
    background-color: var(--color-bg);
    color: #525099;
    border: 2px solid #525099;
  }
  .btn-secondary:hover {
    background-color: #f8f9fa;
  }
  .error-message {
    color: var(--color-error);
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
  @media (max-width: 1024px) {
    form {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 768px) {
    :host {
      padding: 1rem;
    }
    form {
      grid-template-columns: 1fr;
    }
    .btn-group {
      flex-direction: column;
    }
    .btn {
      width: 100%;
    }
  }
`;
