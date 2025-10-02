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
    padding: 0.25rem 0.5rem;
    width: 250px;
    max-width: 100%;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    text-align: left;
  }
  th {
    background: #f5f5f5;
  }
  .list-item {
    border: 1px solid #ddd;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 600px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }
    th, td {
      border: none;
      padding: 0.25rem 0;
    }
    .list-item {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  @media (max-width: 800px) {
    input[type="search"] {
      width: 100%;
    }
  }
`;
