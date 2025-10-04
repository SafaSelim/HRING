import { LitElement, html } from 'lit';
import { store } from '../../state/store.js';
import { selectAllEmployees } from '../../state/employees/employees.selectors.js';
import { deleteEmployee as deleteEmployeeAction } from '../../state/employees/employees.slice.js';
import { getLocale } from '../../assets/i18n/index.js';
import { employeeListStyles } from './employee-list.styles.js';
import { employeeListTableTemplate, employeeListGridTemplate } from './employee-list.template.js';
import { Router } from '@vaadin/router';
import { iconTable, iconGrid, iconChevronLeft, iconChevronRight } from '../../assets/icons.js';
import { sharedFormStyles } from '../../styles/form-styles.js';
import '../confirm-dialog.js';

export class EmployeeList extends LitElement {
  static properties = {
    view: { type: String },
    search: { type: String },
    page: { type: Number },
    pageSize: { type: Number },
    employees: { type: Array },
  };

  static styles = [sharedFormStyles, employeeListStyles];

  constructor() {
    super();
    this.view = 'table';
    this.search = '';
    this.page = 1;
    this.pageSize = 5;
    this.employees = [];
  }

  firstUpdated() {
    this.confirmDialog = this.shadowRoot.querySelector('confirm-dialog');
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      this._updateEmployees();
    });
    this._updateEmployees();
    this._onLang = () => this.requestUpdate();
    window.addEventListener('lang-changed', this._onLang);
  }

  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
    window.removeEventListener('lang-changed', this._onLang);
    super.disconnectedCallback();
  }

  _updateEmployees() {
    this.employees = selectAllEmployees(store.getState());
  }

  _onToggleView(view) {
    this.view = view;
  }

  _onSearch(e) {
    this.search = e.target.value;
    this.page = 1;
  }

  _onPageChange(delta) {
    const next = this.page + delta;
    const max = this._totalPages;
    this.page = Math.min(Math.max(1, next), max);
  }

  _goToPage(p) {
    const max = this._totalPages;
    this.page = Math.min(Math.max(1, p), max);
  }

  _visiblePages() {
    const total = this._totalPages;
    const current = this.page;
    const pages = [];
    const push = p => pages.push(p);
    if (total <= 7) {
      for (let i = 1; i <= total; i++) push(i);
      return pages;
    }
    push(1);
    if (current > 4) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) push(i);
    if (current < total - 3) pages.push('...');
    push(total);
    return pages;
  }

  _onEdit(id) {
    Router.go(`/edit/${id}`);
  }

  _onDelete(employee) {
    console.log(employee);
    if (!this.confirmDialog) {
      console.error('Confirm dialog not found');
      return;
    }
    const t = getLocale();
    
    this.confirmDialog.title = t.deletionDialog.title;
    this.confirmDialog.message = t.deletionDialog.deleteMessage
      .replace('{name}', employee.firstName)
      .replace('{surname}', employee.lastName);
    this.confirmDialog.confirmText = t.deletionDialog.confirm || 'Delete';
    this.confirmDialog.cancelText = t.deletionDialog.cancel || 'Cancel';
    this.confirmDialog.open = true;

    const handleConfirm = () => {
      store.dispatch(deleteEmployeeAction(employee.id));
      this.confirmDialog.removeEventListener('confirm', handleConfirm);
    };
    
    this.confirmDialog.addEventListener('confirm', handleConfirm);
  }

  get _filteredEmployees() {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.employees;
    return this.employees.filter(emp =>
      Object.values(emp).some(val => String(val).toLowerCase().includes(q))
    );
  }

  get _paginatedEmployees() {
    const start = (this.page - 1) * this.pageSize;
    return this._filteredEmployees.slice(start, start + this.pageSize);
  }

  get _totalPages() {
    return Math.max(1, Math.ceil(this._filteredEmployees.length / this.pageSize));
  }

  render() {
    const t = getLocale();
    const toggle = html`
      <div class="view-toggle" role="group" aria-label="View">
        <button class="${this.view === 'table' ? 'active' : ''}" @click=${() => this._onToggleView('table')} title="Table">${iconTable}</button>
        <button class="${this.view === 'grid' ? 'active' : ''}" @click=${() => this._onToggleView('grid')} title="Grid">${iconGrid}</button>
      </div>`;
    const pages = this._visiblePages();
    return html`
      <div class="header-row">
        <span>${t.employees}</span>
        ${toggle}
      </div>
      <div class="search-field">
        <input class="input-base input-text" type="search" placeholder="${t.employee.search}" .value=${this.search} @input=${this._onSearch} />
      </div>
      ${this.view === 'grid' ? employeeListGridTemplate(this, t) : employeeListTableTemplate(this, t)}
      <div class="pagination">
        <button class="nav-btn" @click=${() => this._onPageChange(-1)} ?disabled=${this.page === 1}>${iconChevronLeft}</button>
        ${pages.map(p => p === '...'
          ? html`<span class="page-ellipsis">...</span>`
          : html`<button class="page-btn ${this.page === p ? 'active' : ''}" @click=${() => this._goToPage(p)}>${p}</button>`)
        }
        <button class="nav-btn" @click=${() => this._onPageChange(1)} ?disabled=${this.page === this._totalPages}>${iconChevronRight}</button>
      </div>
      <confirm-dialog @confirm=${this._handleConfirm}></confirm-dialog>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
