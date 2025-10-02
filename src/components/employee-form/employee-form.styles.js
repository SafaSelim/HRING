import { css } from 'lit';

export const employeeFormStyles = css`
  :host {
    display: block;
    padding: 1rem;
    max-width: 720px;
    margin: 0 auto;
    background: var(--color-bg);
    color: var(--color-text);
  }
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1rem;
  }
  label {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }
  input, select {
    padding: 0.6rem;
    font-size: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-bg);
    color: var(--color-text);
  }
  .actions {
    grid-column: 1 / -1;
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
  .error {
    color: var(--color-error);
    font-size: 0.9em;
  }
  @media (max-width: 760px) {
    :host {
      padding: 0.75rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    input, select {
      font-size: 0.95rem;
    }
  }
`;
