import { css } from 'lit';

export const employeeListStyles = css`
  :host {
    display: block;
    padding: 0 2rem;
  }
  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    color: var(--color-primary);
  }
  .view-toggle {
    display: inline-flex;
    gap: 0.25rem;
  }
  .view-toggle button {
    border: none;
    background: none;
    color: var(--color-text);
    border-radius: 6px;
    padding: 0.35rem 0.45rem;
    line-height: 0;
    cursor: pointer;
    color: var(--color-primary);
  }
  .view-toggle button.active {
    background: var(--color-primary-bg);
  }

  /* Themed LIST view (table-like) */
  .list {
    display: block;
    width: 100%;
    box-shadow: 0 2px 8px rgba(34, 34, 34, 0.08);
  }
  [data-theme="dark"] .list {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }
  .list-header,
  .list-row {
    display: grid;
    grid-template-columns: 1.1fr 1.1fr 1.2fr 1.1fr 1.2fr 1.6fr 1.1fr 1.2fr 1fr;
    gap: 0.5rem;
    align-items: center;
    background: var(--color-bg-card);
  }
  .list-header {
    font-weight: 500;
    color: var(--color-primary);
    padding: 0.75rem 0.75rem;
    border-bottom: 1px solid var(--color-border);
  }
  .list-row {
    padding: 0.9rem 0.75rem;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
  }
  .cell {
    display: flex;
    justify-content: center;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 300;
  }
  .cell.bold {
    font-weight: 500;
  }
  .actions {
    display: inline-flex;
    gap: 0.5rem;
    justify-content: flex-end;

    .edit-btn, .delete-btn {
      background: none;
      border: none;
      color: var(--color-primary);
      cursor: pointer;
    }
  }

  .pagination {
    margin-top: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    color: var(--color-text);
  }
  .page-btn {
    background: none;
    border: none;
    color: var(--color-text);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    min-width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .page-btn.active {
    background: var(--color-primary);
    color: #fff;
  }
  .page-ellipsis {
    opacity: 0.6;
    padding: 0 0.25rem;
  }
  .nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-primary);
    padding: 0.25rem;
    line-height: 0;
  }
  .nav-btn:disabled {
    opacity: 0.4;
    color: var(--color-text);
    cursor: default;
  }

  .search-field {
    margin-bottom: 0.75rem;
    background: var(--color-bg-card);
  }

  /* GRID view */
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem;
    margin: 2rem auto;
    width: 90%;
  }
  .grid-card {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    word-break: break-word;
  }
  .grid-card .inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }
  .grid-card .col {
    min-width: 0;
  }
  .grid-card .field {
    margin-bottom: 0.75rem;
  }
  .grid-card .field-label {
    font-size: 0.875rem;
    color: var(--color-text);
    opacity: 0.7;
    margin-bottom: 0.25rem;
    font-weight: 400;
  }
  .grid-card .field-value {
    font-size: 0.95rem;
    color: var(--color-text);
    font-weight: 500;
  }
  .grid-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-start;
  }
  .grid-actions .edit-btn,
  .grid-actions .delete-btn {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    transition: all 0.2s ease;
  }
  .grid-actions .edit-btn {
    background: #525099;
    color: #fff;
  }
  .grid-actions .edit-btn:hover {
    background: #43407a;
  }
  .grid-actions .delete-btn {
    background: var(--color-primary);
    color: #fff;
  }
  .grid-actions .delete-btn:hover {
    background: #e55a00;
  }

  @media (max-width: 1024px) {
    .list-header,
    .list-row {
      grid-template-columns: 1fr 1fr 1fr 1fr 1.2fr 1.6fr 1fr 1.2fr 1fr;
    }
  }
  @media (max-width: 900px) {
    .list-header,
    .list-row {
      grid-template-columns: 1fr 1fr 1fr 1.2fr 1.6fr auto;
    }
    .hide-md { display: none; }
  }
  @media (max-width: 720px) {
    :host {
      padding: 0 1rem;
    }
    .list-header { display: none; }
    .list-row {
      display: block;
      padding: 0.75rem;
    }
    .cell { white-space: normal; }
    .grid { 
      grid-template-columns: minmax(0, 1fr);
      gap: 1.25rem;
      margin: 1.25rem 0;
    }
    .search-field input { width: 100%; }
  }
`;
