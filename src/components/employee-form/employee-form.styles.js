import { css } from 'lit';

export const employeeFormStyles = css`
  :host {
    display: block;
    padding: 1rem;
    max-width: 500px;
    margin: 0 auto;
    background: var(--color-bg);
    color: var(--color-text);
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  label {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }
  input, select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: var(--color-bg);
    color: var(--color-text);
  }
  .actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
  .error {
    color: var(--color-error);
    font-size: 0.9em;
  }
  @media (max-width: 600px) {
    :host {
      padding: 0.5rem;
    }
    form {
      gap: 0.5rem;
    }
    input, select {
      font-size: 0.95rem;
    }
  }
`;
