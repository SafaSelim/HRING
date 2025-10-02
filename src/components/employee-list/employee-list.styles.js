import { css } from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    padding: 1rem;
  }
  .actions button {
    margin-right: 0.5rem;
  }
  .toggle {
    margin-bottom: 1rem;
  }
  .pagination {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    background: var(--color-bg);
    color: var(--color-text);
  }
  input[type="search"] {
    margin-bottom: 1rem;
    padding: 0.5rem 0.75rem;
    width: 320px;
    max-width: 100%;
    border-radius: 6px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid var(--color-border);
    padding: 0.65rem;
    text-align: left;
  }
  th {
    background: rgba(0,0,0,0.04);
  }
  .list-item {
    border: 1px solid var(--color-border);
    margin-bottom: 0.75rem;
    padding: 0.75rem;
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
  @media (max-width: 720px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }
    thead { display: none; }
    tr { margin-bottom: 0.75rem; border: 1px solid var(--color-border); border-radius: 8px; padding: 0.5rem; }
    td { border: none; padding: 0.35rem 0; }
    .list-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
  @media (max-width: 900px) {
    input[type="search"] {
      width: 100%;
    }
  }
`;
