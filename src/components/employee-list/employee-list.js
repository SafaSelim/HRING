import { LitElement, html } from 'lit';
import { store } from '../../state/store.js';
import { selectAllEmployees } from '../../state/employees/employees.selectors.js';
import { deleteEmployee as deleteEmployeeAction } from '../../state/employees/employees.slice.js';
import { getLocale } from '../../assets/i18n/index.js';
import { employeeListStyles } from './employee-list.styles.js';
import { employeeListTableTemplate, employeeListListTemplate, employeeListGridTemplate } from './employee-list.template.js';
import { Router } from '@vaadin/router';
import { iconTable, iconGrid, iconChevronLeft, iconChevronRight } from '../../assets/icons.js';

export class EmployeeList extends LitElement {
  static properties = {
    view: { type: String },
    search: { type: String },
    page: { type: Number },
    pageSize: { type: Number },
    employees: { type: Array },
  };

  static styles = employeeListStyles;

  constructor() {
    super();
    this.view = 'table';
    this.search = '';
    this.page = 1;
    this.pageSize = 5;
    this.employees = [];
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

  _onEdit(id) {
    Router.go(`/edit/${id}`);
  }

  _onDelete(id) {
    const t = getLocale();
    if (window.confirm(t.employee.confirmDelete)) {
      store.dispatch(deleteEmployeeAction(id));
    }
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
    return html`
      <div class="header-row">
        <h2>${t.employees}</h2>
        ${toggle}
      </div>
      <input type="search" placeholder="${t.employee.search}" .value=${this.search} @input=${this._onSearch} />
      ${this.view === 'grid' ? employeeListGridTemplate(this, t) : employeeListTableTemplate(this, t)}
      <div class="pagination">
        <button ?disabled=${this.page === 1} @click=${() => this._onPageChange(-1)}>${iconChevronLeft}</button>
        <span>Page ${this.page} / ${this._totalPages}</span>
        <button ?disabled=${this.page === this._totalPages} @click=${() => this._onPageChange(1)}>${iconChevronRight}</button>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
