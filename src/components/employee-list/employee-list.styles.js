import { css } from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    padding: 1rem;
  }
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  .view-toggle {
    display: inline-flex;
    gap: 0.25rem;
  }
  .view-toggle button {
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    color: var(--color-text);
    border-radius: 6px;
    padding: 0.35rem 0.45rem;
    line-height: 0;
    cursor: pointer;
  }
  .view-toggle button.active {
    color: var(--color-primary);
    background: rgba(25,118,210,0.06);
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
    justify-content: center;
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
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
  .grid-card {
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
    overflow: hidden;
    word-break: break-word;
  }
  .grid-card .inner {
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
  }
  .grid-card .col {
    flex: 1 1 220px;
    min-width: 0;
  }
  .grid-actions {
    margin-top: 0.75rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
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
    .grid { grid-template-columns: minmax(0, 1fr); }
    input[type="search"] { width: 100%; }
  }
`;
